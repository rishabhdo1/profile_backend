module.exports=function(res,code,result,message){
    var response={
        status:code,
        data:result,
        message:message
    }
    return res.status(code).json(response)
}