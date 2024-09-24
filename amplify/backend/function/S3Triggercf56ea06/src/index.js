const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const BUCKET_NAME = process.env.BUCKET_NAME;
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { action, fileName, folderName, expiresIn, version } = JSON.parse(event.body);
  
  switch (action) {
    case 'generateUploadURL':
      return await generateUploadURL(fileName, folderName);
      
    case 'generateDownloadURL':
      return await generateDownloadURL(fileName, folderName);
      
    case 'createSharedLink':
      return await createSharedLink(fileName, expiresIn);
      
    case 'deleteFile':
      return await deleteFile(fileName, folderName);
      
    case 'listFiles':
      return await listFiles(folderName);
      
    case 'getFileVersions':
      return await getFileVersions(fileName, folderName);
      
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid action' }),
      };
  }
};

// Generate a signed URL for uploading a file
const generateUploadURL = async (fileName, folderName) => {
  const key = folderName ? `${folderName}/${fileName}` : fileName;
  
  const url = S3.getSignedUrl('putObject', {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: 60 * 5, // 5 minutes
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ uploadUrl: url }),
  };
};

// Generate a signed URL for downloading a file
const generateDownloadURL = async (fileName, folderName) => {
  const key = folderName ? `${folderName}/${fileName}` : fileName;
  
  const url = S3.getSignedUrl('getObject', {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: 60 * 5, // 5 minutes
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ downloadUrl: url }),
  };
};

// Create an encrypted shared link with expiration
const createSharedLink = async (fileName, expiresIn) => {
  const key = fileName;
  const url = S3.getSignedUrl('getObject', {
    Bucket: BUCKET_NAME,
    Key: key,
    Expires: expiresIn * 60, // expiresIn in minutes
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ sharedUrl: url }),
  };
};

// Delete a file
const deleteFile = async (fileName, folderName) => {
  const key = folderName ? `${folderName}/${fileName}` : fileName;
  
  await S3.deleteObject({
    Bucket: BUCKET_NAME,
    Key: key,
  }).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'File deleted successfully' }),
  };
};

// List files in a folder
const listFiles = async (folderName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: folderName,
  };
  
  const data = await S3.listObjectsV2(params).promise();
  
  const files = data.Contents.map((file) => file.Key);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ files }),
  };
};

// Fetch file versions (if versioning is enabled)
const getFileVersions = async (fileName, folderName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Prefix: folderName ? `${folderName}/${fileName}` : fileName,
  };
  
  const data = await S3.listObjectVersions(params).promise();
  
  const versions = data.Versions.map((version) => ({
    key: version.Key,
    versionId: version.VersionId,
    lastModified: version.LastModified,
  }));
  
  return {
    statusCode: 200,
    body: JSON.stringify({ versions }),
  };
};

// exports.handler = async function (event) {
//   console.log('Received S3 event:', JSON.stringify(event, null, 2));
//   const bucket = event.Records[0].s3.bucket.name;
//   const key = event.Records[0].s3.object.key;
//   console.log(`Bucket: ${bucket}`, `Key: ${key}`);
// };
