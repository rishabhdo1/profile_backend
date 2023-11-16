/**
 * Author: Siddharth Bisht
 * Desc:file to handle all database related queries for user table
 */

 const connection = require("./connection");
 const db = connection.makeDb();
 const config = require("config");
  

 const getCustomers = async number => {
   console.log(number);
  //  return db.query("select UserID, FirstName  as CustomerName from user where CreatedBy = ? and UserName != ?", [number, number]);

   return db.query("select ur.UserID, ur.FirstName  as CustomerName, ur.UserName, IFNULL((Sum(th.AmountDue) - sum(th.AmountPaid)), 0) as AmountDifference from user ur left join transaction_history th on ur.UserID = th.UserID where ur.CreatedBy = ? and ur.UserType = 'CUS' group by ur.UserID", [number]);

 }; 
 const saveCustomer = async req => {
   const number1 = req.body.number;
   console.log(number1)
   return db.query("INSERT INTO user set UserName=?, UserType=?, FirstName=?, MobileNo=?, Address=?, CreatedBy=?", [number1, 'CUS', req.body.firstName, number1, req.body.address, req.body.ownNumber]);
 }; 
 const checkForCustomerExist = async req => {
   return db.query("select count(UserID) as UserCount from user where UserName = ?", [req.body.number]);
 }; 

 const saveCustomerExpense = async (req, vendorUserId) => {
  console.log('qty = '+req.qty)
  console.log(req);
  return db.query("INSERT INTO `transaction_history` (`UserID`, `ProductID`, `TotalAmount`, `AmountDue`, `AmountPaid`, `PurchasedOn`, `CreatedOn`, `CreatedBy`) VALUES (?, ?, (select (?*cost) from product_cost where UserID = ? and ProductID = ?),  (select (?*cost) from product_cost where UserID = ? and ProductID = ?), 0, now(), now(), ?);", [req.targetUserId, req.productID, req.qty, vendorUserId,  req.productID, req.qty, vendorUserId,  req.productID, req.createdBy]);
}; 
 
 module.exports = {
   getCustomers,
   saveCustomer,
   checkForCustomerExist,
   saveCustomerExpense
 };

//  return db.query("INSERT INTO `milk_app`.`transaction_history` (`UserID`, `ProductID`, `TotalAmount`, `AmountDue`, `AmountPaid`, `PurchasedOn`, `CreatedOn`, `CreatedBy`) VALUES (10000002, 10000004, (select (4*cost) from product_cost where UserID = 10000001 and ProductID = 10000004),  (select (4*cost) from product_cost where UserID = 10000001 and ProductID = 10000004), 0, now(), now(), 10000001);", [req.body.number]);
