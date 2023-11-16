/**
 * Author:Siddharth Bisht
 * Desc:Master router to route all the api's to their respective routes
 */

const express = require("express");
const router = express.Router();
const profileRouter = require("./profileRouter");
const userRouter = require("./userRouter");
const customerRouter = require("./customerRouter");
const productRouter = require("./productRouter");
const juiceRouter = require("./juiceRouter");

//define all router here

//router for profile
router.use("/profile", profileRouter);

//router for user
router.use("/user", userRouter);

//router for customer
router.use("/customer", customerRouter);

//router for products
router.use("/products", productRouter);

router.use("/juice", juiceRouter);

module.exports = router;
