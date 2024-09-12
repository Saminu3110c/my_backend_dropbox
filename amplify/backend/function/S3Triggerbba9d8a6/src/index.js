const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const bucketName = event.Records[0].s3.bucket.name;
    const fileName = event.Records[0].s3.object.key;
    const eventTime = event.Records[0].eventTime;

    // Handle file versioning
    const versionId = event.Records[0].s3.object.versionId || 'latest';
    
    // Update DynamoDB with file metadata
    const params = {
        TableName: process.env.METADATA_TABLE_NAME,  // DynamoDB table for file metadata
        Item: {
            fileName: fileName,
            versionId: versionId,
            eventTime: eventTime
        }
    };

    try {
        await dynamoDB.put(params).promise();
        console.log(`File ${fileName} metadata updated with version ${versionId}.`);
    } catch (err) {
        console.error('Error updating DynamoDB:', err);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'File metadata updated successfully',
        }),
    };
};
