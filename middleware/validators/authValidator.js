/**
 * validation for auth api's
 */

const { check, header, validationResult } = require("express-validator");
const sendResponse = require("../../helper/sendResponse");
const messages=require('../../config/messages');
/**
 * for route:api/v1/auth/signup
 *
 */
const signup = [
  check("number")
    .exists()
    .withMessage(messages.english.validation.mobileNumberMissing)
    .bail()
    .isLength({ min: 5, max: 13 })
    .withMessage(messages.english.validation.invalidMobileNumber)
    .bail(),
  check("countryCode")
    .exists()
    .withMessage(messages.english.validation.countryCodeMissing)
    .bail(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      let error=err.array();
      let result = error.map(error =>error.msg);
      return sendResponse(res, 422,result, messages.english.validation.error);
    } else {
      next();
    }
  }
];

const resendOtp = [
  check("number")
    .exists()
    .withMessage(messages.english.validation.mobileNumberMissing)
    .bail()
    .isLength({ min: 5, max: 13 })
    .withMessage(messages.english.validation.invalidMobileNumber)
    .bail()
    .isInt(),
    (req, res, next) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        let error=err.array();
        let result = error.map(error =>error.msg);
        return sendResponse(res, 422,result, messages.english.validation.error);
      } else {
        next();
      }
    }
];


/**
 * for route:api/v1/auth/verifyotp
 */
const verifyOtp = [
  check("number")
    .exists()
    .withMessage(messages.english.validation.mobileNumberMissing)
    .bail()
    .isLength({ min:5})
    .withMessage(messages.english.validation.invalidMobileNumber)
    .bail()
    .isInt()
    .withMessage(messages.english.validation.mobileNumberInvalidType)
    .bail(),
  check("otp")
    .exists()
    .withMessage(messages.english.validation.otpMissing)
    .bail()
    .isLength({ min: 4, max: 4 })
    .withMessage(messages.english.validation.otpInvalidLength)
    .bail()
    .isInt()
    .withMessage(messages.english.validation.otpInvalidType)
    .bail(),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      let error=err.array();
      let result = error.map(error =>error.msg);
      return sendResponse(res, 422,result,messages.english.validation.error);
    } else {
      next();
    }
  }
];

module.exports = {
  verifyOtp,
  signup,
  resendOtp
};
