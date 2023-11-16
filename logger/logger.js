/**
 * Author:Siddharth Bisht
 * Desc: Custom Logger for the application
 */
const winston = require("winston");
class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: `${__dirname}/error.log`,
          level: "error"
        })
      ]
    });
    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple()
        })
      );
    }
  }
  dateFormat(){
    return new Date(Date.now()).toUTCString();
  };

  logError(functionName, error, userId, MobileNumber,data) {
    let message = `FUNC:${functionName}|${error.toString()}|USERID:${userId}|NUMBER:${MobileNumber}|DATE:${this.dateFormat()}|data:${JSON.stringify(data)}`;
    this.logger.error(message);
  }
}

module.exports = new Logger();
