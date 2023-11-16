/**
 * Author: Siddharth Bisht
 * Desc:controller for /profile api's
 */

const sendResponse = require("../helper/sendResponse");
const message = require("../config/messages");
const logger=require('../logger/logger');

//method to upload profile pic
const profilePic = async (req, res) => {
  try {
    // let location = await profileHandler.uploadProfilePic(req.file, req.userId);
    return sendResponse(res, 200, "location", message.english.profilePicUpload);
  } catch (e) {
    logger.logError('profileController:profilePic',27);
    return sendResponse(res, 500, [e.toString()], message.english.serverError);
  }
};


module.exports = {
  profilePic
};
