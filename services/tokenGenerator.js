const jwt=require('jsonwebtoken');

generateAuthToken = function(userId) { 
    const token = jwt.sign({ id: userId}, process.env.JWT_AUTH_KEY || 'qwerty'); //get the private key from the config file -> environment variable
    return token;
  }

  module.exports={
    generateAuthToken
  }