
const sendResponse = require("../helper/sendResponse");
const message = require("../config/messages");
const logger=require('../logger/logger');
const {getjuiceHandler,getjuiceHandle, savejuiceHandler} = require('../handlers/juiceHandler');

//method to upload profile pic
  const getjuiceProducts = async (req, res) => {
  try {
    console.log('getjuiceProductList');
    //  console.log(req.query.Id)
    let result = await getjuiceHandler(1);
    return sendResponse(res, result.status, result.data, message.english.fetchedSuccessfully);
  } catch (e) {
    logger.logError('juiceController:getjuiceList',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
  };
const getjuiceDetails = async (req, res) => {
  try {
    console.log('getjuiceDetails');
   //  console.log(req.query.Id)
    let result = await getjuiceHandle(1);
    return sendResponse(res, result.status, result.data, message.english.fetchedSuccessfully);
  } catch (e) {
    logger.logError('juiceController:getjuiceDetailst',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
 };


const savejuiceProducts = async (req, res) => {
 try {
   let result = await savejuiceHandler(req,res);
   return sendResponse(res, 200, "Save juice Products", message.english.productsSavedSuccess);
 } catch (e) {
   logger.logError('profileController:profilePic',27);
   return sendResponse(res, 500, [e.toString()], message.english.serverError);
 }
};

module.exports = {
 getjuiceProducts,
 getjuiceDetails,
 savejuiceProducts
};
