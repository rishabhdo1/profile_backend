const { check, header, validationResult } = require("express-validator");
const sendResponse = require("../../helper/sendResponse");
const messages=require('../../config/messages');
/**
 * for all router: 
 *
 */
const headerCheck = [
  header("device-id")
    .exists()
    .withMessage(messages.english.validation.deviceIdMissing)
    .bail(),
    header("device-type")
    .exists()
    .withMessage(messages.english.validation.deviceTypeMissing)
    .bail()
    .custom((device_type, { req }) => {
     device_type = ["android", "ios","web"]
      if (device_type.includes(req.get('device-type'))) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage(messages.english.validation.invalidDeviceType)
    .bail(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return sendResponse(res, 422, err.array(), messages.english.validation.error);
    } else {
      next();
    }
  }
];

module.exports=headerCheck;