/**
 * Author: Siddharth Bisht
 * Desc:file to handle all database related queries for user table
 */

const connection = require("./connection");
const db = connection.makeDb();
const config = require("config");


/**
 * function to get user by id
 * @param {} userId
 */
const getUser = async userId => {
  return db.query("SELECT * FROM user WHERE user_id=", [userId]);
};


/**
 * function to get user by number
 * @param {} mobile_number
 */
const findUserByNumber = async mobile_number => {
  return db.query(
    `SELECT UserId, UserName, FirstName, LastName, Address from user WHERE MobileNo=?`,
    [
      mobile_number,
    ]
  ); 
};

/**
 * function to get user by number
 * @param {} mobile_number
 */
 const findUserByID = async UserID => {
  return db.query(
    `SELECT UserId, UserName, FirstName, LastName, Address from user WHERE UserID=?`,
    [
      UserID,
    ]
  ); 
};

/**
 * function to create a new user
 * @param {*} mobile_number
 * @param {*} country_code
 * @param {*} device_id
 * @param {*} otp
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} fcm_reg_id
 */
const createUser = async (UserName, UserType, MobileNo, CreatedBy) => {
  return db.query(
    "INSERT INTO user(UserName, UserType, MobileNo, CreatedBy) VALUES(?,?,?,?) ",
    [
      UserName, UserType, MobileNo, CreatedBy
    ]
  );
};

/**
 *
 * @param {*} otp
 * @param {*} number
 * @param {*} fcmId
 * @param {*} latitude
 * @param {*} longitude
 */
const updateOtp = async (otp, number) => {
  return db.query("UPDATE user set otp=? WHERE mobile_number=?", [otp, number]);
};


/**
 * function to get user by number
 * @param {} mobile_number
 */
 const updateUserProfile = async (FirstName, LastName, Address, UserID) => {
  return db.query(
    `UPDATE user SET FirstName = ?, LastName = ?, Address = ? WHERE UserID = ?`,
    [
      FirstName, LastName, Address, UserID
    ]
  ); 

};

// UPDATE user SET FirstName = 'abc', LastName = 'bcd', Address = 'Banjarawala' WHERE UserID = 10000008;



module.exports = {
  createUser,
  findUserByNumber,
  updateOtp,
  getUser,
  updateUserProfile,
  findUserByID
};


// "INSERT INTO user(UserName, UserType, MobileNo, CreatedBy) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE  user.UserName=?,user.UserType=?,user.MobileNo=?,user.CreatedBy=?",
