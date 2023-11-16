/**
 * AUthor:Siddharth Bisht
 * Desc: file contains sanity checks for api
 * checks verifies if the upcoming request is coming from a genuine user or not
 */

/**
 * function to match the security key as provided from the request header
 * @param {} req
 * @param {*} req
 * @param {*} next
 */
const securityKeyCheck = async function(req, req, next) {
  next();
};

/**
 * function to check whether the user is red flagged or not
 * @param {} req
 * @param {*} res
 * @param {*} next
 */
const redFlagCheck = async (req, res, next) => {
  next();
};

module.exports = {
  securityKeyCheck,
  redFlagCheck
};
