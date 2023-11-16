/**
 * Author: Siddharth Bisht
 * Desc:file to handle all database related queries for user table
 */

const connection = require("./connection");
const db = connection.makeDb();
const config = require("config");
 
const getProducts = async userId => {
  console.log(userId);
  return db.query("select p.ProductName, p.ProductID, p.ProductDescription, pc.Cost, pc.UomCode as perUnit from product p join product_cost pc on p.ProductID = pc.ProductID where pc.UserID = ? ", [userId]);
}; 

const getUserProducts = async userId => {
  // console.log(userId);
  return db.query("select p.ProductID, p.ProductName, ifnull(pc.Cost, 0) as ProductCost, ifnull(pc.UomCode, '') as ProductUom, case when isnull(pc.ProductID) = 1 then 0 else 1 end as isSelected from product p left outer join product_cost pc on pc.ProductID = p.ProductID and pc.UserID = ?; ", [userId]);
}; 

const deleteProducts = async data => {
  console.log(data);
  const result1 = db.query("DELETE FROM myproducts WHERE UserID = ?;", [data.UserID]);
  const result2 = db.query("DELETE FROM product_cost WHERE UserID = ?;", [data.UserID]);
  return true;
}
const saveUserProducts = async data => {
  console.log(data);
  // const result1 = db.query("DELETE FROM myproducts WHERE UserID = ?;", [data.UserID]);
  // const result2 = db.query("DELETE FROM product_cost WHERE UserID = ?;", [data.UserID]);
  const result3 = db.query("INSERT INTO myproducts (`ProductID`, `UserID`, `UomCode`) VALUES (?, ?, ?); ", [data.productID, data.UserID, data.uom]);
  const result4 = db.query("INSERT INTO product_cost (`UserID`, `ProductID`, `Cost`, `UomCode`) VALUES (?, ?, ?, ?)", [data.UserID, data.productID, data.prodCost, data.uom]);
  return true;
}; 

module.exports = {
  getProducts,
  getUserProducts,
  saveUserProducts,
  deleteProducts
};