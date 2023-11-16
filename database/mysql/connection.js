/**
 * Author: Siddharth Bisht
 * connection file for mysql
 * returns: promise
 */


const mysql=require('mysql');
const config=require('config');
const util=require('util');
function makeDb() {

  let connection;
  // if (process.env.HEROKU_CON_STRING) {
    // connection=mysql.createConnection(process.env.HEROKU_CON_STRING || 'mysql://umojgyh2i8at5dz9:zzn5plmwg7wp9v1m@exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/gxbtyymc07xh63tc')
    // connection=mysql.createConnection( 'mysql://root:rishabh@5678@localhost:3306/milk_app')
  // } else {
    connection=mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'rishabh@5678',
      port:3306,
      database:'milk_app',
      dateStrings: true
  });
  // }
   
    return {
      query(sql, args ) {
        // console.log(connection.query)
        return util.promisify(connection.query)
          .call( connection, sql, args);
      },
      close() {
        return util.promisify( connection.end )
        .call( connection);
      }
    };
  }
  
module.exports={
  makeDb,
  mysql
}


