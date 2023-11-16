
/**
 * function to handle all errors
 * res:response object
 * code:errorCode,
 * errorMessage:message to be send as an error,
 * errorName:name of the error
 */
module.exports=function(res,code,errorMessage){
    var error=new Error();
    error.status=code;
    error.message=errorMessage;
    return res.status(code).json(error);
}