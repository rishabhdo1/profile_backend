/**
 * Author: Siddharth Bisht
 * desc: router for profile
 */

 const express = require("express");
 const router = express.Router();
 const productController = require("../controllers/productController");
 const auth = require("../middleware/authMiddleware");

 //router for profile pic 
 router.get("/getProductList", auth.verifyToken, productController.getProductList);
 router.put("/saveUserProducts", auth.verifyToken, productController.saveProducts);
 
 module.exports = router;
 