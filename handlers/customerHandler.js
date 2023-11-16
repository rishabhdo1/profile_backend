const db = require("../database/mysql/customer");
const logger=require('../logger/logger');
const sendError = require("../helper/sendErrorResponse");
const messages=require('../config/messages');
const errorMessages=require('../config/errorMessages');

const getCustomerHandler = async (number) => {
  try {
    console.log('number',number)
    const result = await db.getCustomers(number);
    if (result.length > 0) {
      return { status: 200, data: result, message: messages.english.fetchedSuccessfully };
    } else {
      return { status: 404, data: [], message: errorMessages.NoData.message };
    }
  } catch (e) {
    logger.logError('signupHandler',e,"",number);
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};
const saveCustomerHandler = async (req) => {
  try {
    const result = await db.checkForCustomerExist(req);
    if (result[0].UserCount > 0) {
      return { status: 404, data: [], message: errorMessages.userExist.message };
    } else {
      const result = await db.saveCustomer(req);
      if (result) {
        return { status: 200, data: result, message: messages.english.savedSuccessfully };
      } else {
        return { status: 404, data: [], message: errorMessages.NoData.message };
      }
    }
  } catch (e) {
    logger.logError('signupHandler',e,"",number);
    console.log('inside erroe');
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};

const saveCustomerExpenseHandler = async (req) => {
  try {
    var successCount = 0
    for (const item of req.body.data) {  
      console.log(`A JavaScript type is: ${item}`)
      const result = await db.saveCustomerExpense(item, req.userId);
      if (result) {
        successCount += 1
      }
    }
    
    // const result = await db.saveCustomerExpense(req);
    if (successCount > 0) {
      return { status: 200, data: [], message: messages.savedSuccessfully };
    } else {
      return { status: 404, data: [], message: errorMessages.NoData.message };
    }
  } catch (e) {
    console.log('inside erroe'+e);

    logger.logError('signupHandler',e,"",number);
    console.log('inside erroe');
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};

module.exports = {
  getCustomerHandler,
  saveCustomerHandler,
  saveCustomerExpenseHandler
};
