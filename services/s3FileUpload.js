const fs = require("fs");
const AWS = require("aws-sdk");
const logger=require('../logger/logger')

const uploadFile = (filePath, fileKey) =>
  new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      apiVersion: process.env.API_VERSION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey:process.env.SECRET_ACCESS_KEY
    });
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      const params = {
        Bucket: process.env.BUCKET_NAME, 
        Key: fileKey,
        Body: data,
        ACL: "public-read"
      };
      s3.upload(params, (error, result) => resolve(result));
    });
  });


  module.exports=uploadFile;