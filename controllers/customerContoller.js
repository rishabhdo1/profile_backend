/**
 * Author: Siddharth Bisht
 * Desc:controller for /profile api's
 */

 const sendResponse = require("../helper/sendResponse");
 const message = require("../config/messages");
 const logger=require('../logger/logger');
 const {getCustomerHandler, saveCustomerHandler, saveCustomerExpenseHandler} = require('../handlers/customerHandler');

 //method to upload profile pic
 const getCustomerList = async (req, res) => {
  try {
    let result = await getCustomerHandler(req.query.number);
    return sendResponse(res, result.status, result.data, message.english.fetchedSuccessfully);
  } catch (e) {
    logger.logError('productController:getCustomerList',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};

const saveCustomer = async (req, res) => {
  try {
    let result = await saveCustomerHandler(req);
    return sendResponse(res, result.status, result.data, result.message);
  } catch (e) {
    logger.logError('profileController:profilePic',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};
 
const saveCustomerExpense = async (req, res) => {
  try {
    let result = await saveCustomerExpenseHandler(req);
    return sendResponse(res, result.status, result.data, result.message);
  } catch (e) {
    logger.logError('customerController:saveCustomerExpense',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};
 
 
 module.exports = {
  getCustomerList,
  saveCustomer,
  saveCustomerExpense
 };
 