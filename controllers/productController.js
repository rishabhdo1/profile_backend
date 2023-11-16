/**
 * Author: Siddharth Bisht
 * Desc:controller for /profile api's
 */

 const sendResponse = require("../helper/sendResponse");
 const message = require("../config/messages");
 const logger=require('../logger/logger');
 const {getProductsHandler, saveProductsHandler} = require('../handlers/productHandler');

//method to upload profile pic
const getProductList = async (req, res) => {
  try {
    console.log('getProductList');
    console.log(req.userId)
    let result = await getProductsHandler(req.userId);
    return sendResponse(res, result.status, result.data, message.english.fetchedSuccessfully);
  } catch (e) {
    logger.logError('productController:getProductList',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};


const saveProducts = async (req, res) => {
  try {
    let result = await saveProductsHandler(req,res);
    return sendResponse(res, 200, "Save User Products", message.english.productsSavedSuccess);
  } catch (e) {
    logger.logError('profileController:profilePic',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};

 module.exports = {
  getProductList,
  saveProducts,
 };
 