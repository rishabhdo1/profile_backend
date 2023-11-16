/**
 * Author: Siddharth Bisht
 */

const admin=require('firebase-admin');
const logger=require('../logger/logger');
admin.initializeApp(admin.credential.applicationDefault());
const sendPushNotification=(payload)=>{
    return new Promise((resolve,reject)=>{
    var message={
        notification:{
            title:payload.title,
            body:payload.body.replace("##PH1",payload.sourceName)
        },
        data:{
            title:payload.title,
            body:payload.body.replace("##PH1",payload.sourceName),
            userNotificationId:payload.userNotificationId.toString(),
            sourceUserId:payload.sourceUserId.toString(),
            sourceName:payload.sourceName.toString(),
            sourceUserImageId:payload.sourceUserImageId.toString(),
            isShown:payload.isShown.toString(),
            type:payload.notificationType.toString(),
            time:payload.time.toString()
        },
            token:payload.token.toString()
    }

        admin.messaging().send(message).then((response)=>{
            resolve(response);
        })
        .catch((e)=>{
            logger.logError('sendPushNotification',e,payload.sourceUserId)
            reject(e);
        })
    });
}

module.exports=sendPushNotification;
