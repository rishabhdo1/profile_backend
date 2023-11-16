const userDb = require("../database/mysql/user");
const logger=require('../logger/logger');
const tokenGenerator = require("../services/tokenGenerator");
const sendError = require("../helper/sendErrorResponse");
const messages=require('../config/messages');
const errorMessages=require('../config/errorMessages');

const signupHandler = async (number,countryCode,deviceId,latitude,longitude,fcmId,deviceType) => {
  try {
    const otp = number === "9999999999" ? 1010 : otpGenerator();
    await userDb.createUser(number,countryCode,deviceId,otp,latitude,longitude,fcmId,deviceType);
    const data = await smsService.sendSmsTransactional(number, otp,countryCode);
    if (data.statusCode == 200) {
      return { status: 200, data: [], message: messages.english.otpSent };
    } else {
      return { status: 503, data: [], message: messages.english.smsApiError };
    }
  } catch (e) {
    logger.logError('signupHandler',e,"",number);
    return { statusCode: 500, message: config.get("messages").serverError };
  }
};

const loginHandler = async (req, res) => {
    try {
      console.log(req.body.UserType)
      const result = await userDb.findUserByNumber(req.body.number);
      if (result.length > 0) {
        result[0].token = tokenGenerator.generateAuthToken(result[0].UserId);
        return { statusCode: 200, data: result[0], message: messages.english.logInSuccess };
      } else {
        const signup = await userDb.createUser(req.body.number, req.body.UserType, req.body.number, req.body.number);
        if (signup) {
          const login = await userDb.findUserByNumber(req.body.number);
          login[0].token = tokenGenerator.generateAuthToken(login[0].UserId);
          return { statusCode: 200, data: login[0], message: messages.english.logInSuccess };
        } else {
          return { statusCode: 404, data: [], message: errorMessages.userDNE.message };
          /*
          sendError(
            res,
            errorMessages.userDNE.code,
            errorMessages.userDNE.message
          ); 
          */
        }
      }
    } catch (e) {
      logger.logError('authMiddleware:verifyUserExist:',e);
      return { statusCode: 500, data: [], message: e.toString() };
      // sendError(res, 500, e.toString());
    }
};

const updateUserProfileHandler = async (FirstName, LastName, Address, UserID) => {
  try {
    const result = await userDb.updateUserProfile(FirstName, LastName, Address, UserID);
    console.log(result)
    if (result.affectedRows > 0) {
      const userData = await userDb.findUserByID(UserID);
      return { statusCode: 200, data: userData[0], message: messages.english.savedSuccessfully };
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
  signupHandler,
  loginHandler,
  updateUserProfileHandler
};
