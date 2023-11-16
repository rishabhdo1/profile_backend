const db = require("../database/mysql/Juice");
const logger=require('../logger/logger');
const tokenGenerator = require("../services/tokenGenerator");
const sendError = require("../helper/sendErrorResponse");
const messages=require('../config/messages');
const errorMessages=require('../config/errorMessages');

const getjuiceHandler = async (userId) => {
  try {
    console.log(userId);
    const result = await db.getjuiceProducts(userId);
    if (result.length > 0) {
      console.log(result);
      return { status: 200, data: result, message: messages.english.fetchedSuccessfully };
    } else {
      console.log('result.length = 0');
      return { status: 404, data: [], message: errorMessages.NoData.message };
    }
  } catch (e) {
    console.log(e);
    logger.logError('signupHandler',e,"",number);
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};
const getjuiceHandle = async (userId) => {
  try {
    console.log(userId);
    const result = await db.getjuiceDetails(userId);
    if (result.length > 0) {
      console.log(result);
      return { status: 200, data: result, message: messages.english.fetchedSuccessfully };
    } else {
      console.log('result.length = 0');
      return { status: 404, data: [], message: errorMessages.NoData.message };
    }
  } catch (e) {
    console.log(e);
    logger.logError('signupHandler',e,"",number);
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};


const savejuiceHandler = async (req,res) => {
    try {
      var total = 0;
      await db.deletejuiceProducts(req.body.data[0])
      for (i in req.body.data) {
        await db.savejuiceProducts(req.body.data[i])
        total += 1;
      }
      console.log(total);
      if (total == req.body.data.length) {
        return { statusCode: 200, data: 'Done', message: messages.english.productsSavedSuccess };
      } else {
        return sendError(
          res,
          errorMessages.userDNE.code,
          errorMessages.userDNE.message
        );
      }
    } catch (e) {
      logger.logError('authMiddleware:verifyUserExist:',e);
      sendError(res, 500, e.toString());
    }
};

module.exports = {
  getjuiceHandler,
  getjuiceHandle,
  savejuiceHandler
};