
class fcmPayload{
    constructor(sourceUserId,targetUserId,userNotificationId,notification,notificationType,sourceImageId,token,collapseKey,title){
        this.sourceUserId=sourceUserId;
        this.targetUserId=targetUserId;
        this.notification=notification,
        this.notificationType=notificationType;
        this.sourceImageId=sourceImageId;
        this.token=token;
        this.collapseKey=collapseKey;
        this.title=title;
        this.userNotificationId=userNotificationId;
    }
    checkToken(){
        if(!this.token){
        throw Error("user token missing")
        }
    }
    checkNotificationType(){
        if(!this.notificationType){
            throw new Error("notification type  missing")
        }
    }
    checkNotification(){
        if(!this.notification){
            throw new Error("notification is missing")
        }
    }  
    checkCollapseKey(){
        if(!this.collapseKey){
            throw new Error("collapse key missing");
        }
    }
    checkTitle(){
        if(!this.title){
            throw new Error("title is missing")
        }
    }
    get fcmPayload(){
        return this;
    }
}
module.exports=fcmPayload;