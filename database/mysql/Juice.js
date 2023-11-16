const connection = require("./connection");
const db = connection.makeDb();
const config = require("config");

const getjuiceProducts = Id => {
    console.log(Id);
    // const fsd = db.query("select Id,Name,Price from Juice; ");
    // console.log(fsd);
    return db.query("select Id,Name,Price from Juice; ");
  }; 
  const getjuiceDetails = Id => {
    console.log(Id);
    return db.query("select Id,Name,Price,Energy, Protein,Manufacturing_date from Juice;");
  }; 
  const deletejuiceProducts = async data => {
    console.log(data);
    const result1 = db.query("DELETE FROM Juice WHERE Id = ?;", [data.Id]);
    return true;
  }
  const savejuiceProducts = async data => {
    console.log(data);
    // const result1 = db.query("DELETE FROM myproducts WHERE UserID = ?;", [data.UserID]);
    // const result2 = db.query("DELETE FROM product_cost WHERE UserID = ?;", [data.UserID]);
    const result2 = db.query("INSERT INTO Juice (`Id`,`Name`, `Price`) VALUES (?,?,?); ", [data.Id, data.Name, data.Price]);
     return true;
  }; 

  
module.exports = {
    getjuiceProducts,
    getjuiceDetails,
    savejuiceProducts,
    deletejuiceProducts
  };
    