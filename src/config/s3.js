const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { awsBucket, awsAccessKey, awsSecretKey, awsRegion } = require("./vars");

const region = awsRegion;
const bucketName = awsBucket;
const accessKeyId = awsAccessKey;
const secretAccessKey = awsSecretKey;

let s3;

try {
  s3 = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });
  if (!s3) {
    throw new Error("S3Client did not created");
  }
} catch (error) {
  console.error(`Error creating S3Client: ${error}`.red.underline.bold);
  throw error;
}

//UPLOAD FILE TO S3
async function uploadFile(fileBuffer, fileName, mimetype) {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
    };
    const response = await s3.send(new PutObjectCommand(uploadParams));
    if (!response) {
      throw new Error("The file didn't upload");
    } else {
      console.log(`File uploaded successfully: ${response}`);
    }

    return response;
  } catch (error) {
    console.error(`Error uploading file: ${error}`.red.underline.bold);
    throw error;
  }
}

// DOWNLOAD FILE FROM S3
async function getFileStream(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    const response = s3.getObject(downloadParams).createReadStream();
    if (!response) {
      throw new Error("The file didn't downloaded");
    } else {
      console.log(`File downloaded successfully: ${fileKey}`);
    }

    return response;
  } catch (error) {
    console.error(`Error downloading file: ${error}`.red.underline.bold);
    throw error;
  }
}

module.exports = { uploadFile, getFileStream };
