const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000; 
const masterRouter = require("./routes/masterRouter");
const securityCheck = require("./middleware/security/sanityCheck");
const sendResponse = require("./helper/sendResponse");
const cors = require("cors");
const config = require("config");
const messages=require('./config/messages');
//clusterize the app
const cluster = require("cluster");
let workers = []; // array to store the workers(clusters)

//function to set up worker processes by forking on the cluster
const setupWorkerProcesses = () => {
  let numCores = require("os").cpus().length;
  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());
    workers[i].on("message", function(message) {});
  }
  cluster.on("online", function(worker) {});
  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
    workers.push(cluster.fork());
    workers[workers.length - 1].on("message", function(message) {});
  });
};

//function to set up express 'app
const setUpExpress = () => {
    
  //allow app to use cors
  app.use(cors());
  //disabse x-powered-by for security purposes
  app.disable("x-powered-by");
  //valid json check
  app.use(
    express.json({
      verify: (req, res, buf, encoding) => {
        try {
          JSON.parse(buf);
        } catch (e) {
          sendResponse(res, 400, ["invalid json"],messages.english.invalidJson);
          throw Error("invalid JSON");
        }
      }
    })
  );
  //start app here
  //index route
  app.get("/", async (req, res) => {
    res.send("<h1>Welcome to Dairy</h1>");
  });
 
  //api routes
  app.use("/api/v1",securityCheck.securityKeyCheck,securityCheck.redFlagCheck,masterRouter);
  //  pointsMigration().then(()=>{
  //    console.log("migration done")
  //  })
  //  .catch((e)=>{
  //    console.log("Error:",e);
  //  });
  app.listen(PORT);
};

const setupServer = isClusterRequired => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    // to setup server configurations and share port address for incoming requests
    setUpExpress();
  }
};

setupServer(false);
