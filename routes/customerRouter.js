/**
 * Author: Siddharth Bisht
 * desc: router for profile
 */

 const express = require("express");
 const  router = express.Router();
 const contoller = require("../controllers/customerContoller");
 const auth = require("../middleware/authMiddleware");
 
 router.get("/getCustomerList", contoller.getCustomerList);
 router.post("/saveCustomer", contoller.saveCustomer);
 router.post("/saveCustomerExpense",auth.verifyToken, contoller.saveCustomerExpense);

 module.exports = router;