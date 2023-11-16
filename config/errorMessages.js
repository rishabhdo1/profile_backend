const errorMessages={
    "invalidJson":{
        "code":400,
        "title":"jdsjsdfjksdf",
        "message":"invalid Json"
    },
    "invalidToken":{
        "code":401,
        "message":"Invalid token"
    },
    "userExist":{
        "code":409,
        "message":"User already exists"
    },
    "userDNE":{
        "code":404,
        "message":"User does not exist"
    },
    "smsAPi":{

    },
    "NoData": {
        "code":404,
        "title":"No Data Found",
        "message":"No Data Found"
    }
    }


module.exports=errorMessages;