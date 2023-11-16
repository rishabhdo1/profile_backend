/**
 * Author:Siddharth Bisht
 * middleware to verify tokens
 *
 */

const jwt = require("jsonwebtoken");
const config = require("config");
const sendResponse = require("../helper/sendResponse");
const userDb = require("../database/mysql/user");
const sendError = require("../helper/sendErrorResponse");
const errorMessages = require("../config/errorMessages");
const messages=require('../config/messages');
const logger=require('../logger/logger');
//function to verify token received in the header
const verifyToken = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token)
    return sendResponse(res, 401, {},messages.english.invalidToken);
  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_KEY || 'qwerty');
    req.userId = decoded.id;
    next();
  } catch (ex) {
    logger.logError('authMiddleware:verifyToken:',ex);
    return sendResponse(res, 500, [ex.toString()],messages.english.server);
  }
};

// function to check if verified user exists or not
const checkIfUserExist = async function(req, res, next) {
  try {
    const result = await userDb.findUserByNumber(req.body.number);
    if (result.length > 0) {
      return sendError(
        res,
        errorMessages.userExist.code,
        errorMessages.userExist.message
      );
    } else {
      next();
    }
  } catch (e) {
    logger.logError('authMiddleware:checkIfUserExist:',e,"",req.body.number);
    sendError(res, 500, [e.toString()],messages.english.serverError);
  }
};

//to be used at login
const verifyUserExist = async function(req, res, next) {
  try {
    const result = await userDb.findUserByNumber(req.body.number);
    console.log(result)
    if (result.length > 0) {
      next();
    } else {
      return sendError(
        result,
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
  verifyToken,
  checkIfUserExist,
  verifyUserExist
};
