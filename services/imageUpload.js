/**
 * Author: SIddharth Bisht
 * Desc: helper module to upload image in amazon s3
 */


var AWS = require('aws-sdk')
const fs = require('fs')
AWS.config.update({
  accessKeyId: AKIAITSPUXIZZ7BGKK5A,
  secretAccessKey: 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,
  region: 'ap-south-1'
})

const upload=function(filePath){
  new Promise((resolve,reject)=>{
    const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  })
  s3.putObject({
    Bucket: BUCKET,
    Body: fs.readFileSync(localImage),
    Key: imageRemoteName
  }).promise()
  .then(response => {
  
  })
  .catch(err => {

  })

}
const uploadPublicRead = (filePath, fileKey) => new Promise((resolve, reject) => {
 // AWS.config.update(sails.config.aws_config);

  fs.readFile(filePath, (err, data) => { 
    if(err) {
      reject(err);
    }
    const params = {
      Key: `${sails.config.s3_config_public.base_key}/${fileKey}`,
      Body: data,
      Bucket: sails.config.s3_config_public.bucket_name,
      ACL: 'public-read',
    };
    s3.upload(params, (error, result) => resolve(result));
  });
});

const getPublicUrl = fileKey => new Promise((resolve, reject) => {
  AWS.config.update(sails.config.aws_config);
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const params = {
    Bucket: sails.config.s3_config_public.bucket_name,
    Key: `${sails.config.s3_config_public.base_key}/${fileKey}`,
    ACL: 'public-read',
  };
  s3.getSignedUrl('getObject', params, (err, result) => {
    if(err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const getFileUrl = fileName => new Promise(((resolve, reject) => {
  AWS.config.update(sails.config.aws_config);
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  const params = {
    Bucket: sails.config.s3_config_public.bucket_name,
    Key: `${sails.config.s3_config_public.base_key}/${fileName}`,
    Expires: 3600};
  s3.getSignedUrl('getObject', params, (err, result) => {
    if(!err) {
      resolve(result);
    }
    reject(err);
  });
}));

const uploadFileP = (filePath, fileKey) => new Promise(((resolve, reject) => {
  AWS.config.update(sails.config.aws_config);
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  fs.readFile(filePath, (err, data) => {
    if(err) {
      reject(err);
    } else {
      const params = {
        Key: `${sails.config.s3_config_public.base_key}/${fileKey}`,
        Body: data,
        Bucket: sails.config.s3_config_public.bucket_name,
      };
      s3.upload(params, (error, result) => {

        if(error) {
          reject(error);
        } else {
          S3UploadService.getPublicUrl(fileKey).then(signedUrl => resolve(signedUrl))
            .catch(e => reject(e));
        }
      });
    }
  });
}));

module.exports = {
  getFileUrl,
  uploadFileP,
  uploadPublicRead,
  getPublicUrl,
};
