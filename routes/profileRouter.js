/**
 * Author: Siddharth Bisht
 * desc: router for profile
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

//router for profile pic 
router.get("/getProductList", controller.getProductList);
router.get("/saveProducts", controller.saveProducts);

module.exports = router;


//request reviews
