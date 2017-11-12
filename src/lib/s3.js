/* eslint-disable import/prefer-default-export */
import AWS from 'aws-sdk';
import mime from 'mime';
import config from '../config';

AWS.config.update({
  accessKeyId: config.AWS_S3.accessKey,
  secretAccessKey: config.AWS_S3.secretKey,
});

const bucket = new AWS.S3({
  params: { Bucket: 'drop.communityfund.is' },
  region: 'eu-west-1',
  signatureVersion: 'v4',
});

export const getUploadUrl = key =>
  new Promise((resolve, reject) => {
    const params = {
      Key: key,
      Expires: 60,
      ContentType: mime.getType(key),
      ACL: 'public-read',
    };

    bucket.getSignedUrl('putObject', params, (err, url) => {
      if (err) return reject(err);

      return resolve(url);
    });
  });
