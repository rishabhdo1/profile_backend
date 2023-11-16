const nodemailer=require('nodemailer');
const logger=require('../logger/logger');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.EMAIL,
         pass: process.env.EMAIL_PASSWORD,
         tls: { rejectUnauthorized: false } 
     }
 });
 const sendText=function(to,subject,text){
   return new Promise((resolve,reject)=>{
     var emailOptions={
       from:process.env.EMAIL,
       to:to,
       subject:subject,
       html:text
     };
     transporter.sendMail(emailOptions,function(err,info){
       if(err){
         logger.logError(`emailService:sendText`,err);
         reject(err);
       }
       else{
         resolve(info);
       }
      
     })
   })
 }



// sendText(to, subject, text) {
//     return new Promise((resolve, reject) => {
//       this.emailClient.sendMail({
//         from:process.env.EMAIL,
//         to:to,
//         subject:subject,
//         text:text
//       }, (err, info) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve(info)
//         }
//       })
//     })
//   }


module.exports= sendText