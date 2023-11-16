/**
 * Author: Siddharth Bisht
 * Desc:controller for /profile api's
 */

 const sendResponse = require("../helper/sendResponse");
 const message = require("../config/messages");
 const logger=require('../logger/logger');
 const {signupHandler, loginHandler, updateUserProfileHandler}=require('../handlers/userHandler');
const messages = require("../config/messages");

 //method to upload profile pic
 const login = async (req, res) => {
   try {
     console.log('login')
     let result=await loginHandler(req, res);
     return sendResponse(res, result.statusCode, result.data, messages.english.logInSuccess);
   } catch (e) {
     logger.logError('user:login',100001);
     return sendResponse(res, 500, [e.toString()], message.english.serverError);
   }
 };
 
const signup = async (req, res) => {
  try {
    let {number,countryCode,latitude,longitude,fcmId}=req.body;
    let deviceId=req.get("device-id");
    let deviceType=req.get("device-type");
    result=await signupHandler(number,countryCode,deviceId,latitude,longitude,fcmId,deviceType);
    return sendResponse(res,result.status,result.data,result.message);
  } catch (e) {
    sendResponse(res, 500,[ e.toString()],messages.english.serverError);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let {FirstName,LastName,Address,UserID}=req.body;
    console.log(UserID)
    let result=await updateUserProfileHandler(FirstName, LastName, Address,UserID);
    console.log('res'+ result)
    return sendResponse(res,result.statusCode,result.data,result.message);
  } catch (e) {
    return sendResponse(res, 500,[ e.toString()],messages.english.serverError);
  }
};

 module.exports = {
  login,
  signup,
  updateUserProfile
 };
 