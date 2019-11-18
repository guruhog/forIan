module.exports = Object.freeze({
  PORT: process.env.PORT,
  microServiceName: 'Upload Server',
  nodeEnv: process.env.NODE_ENV,
  s3Config: {
    accessKey: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
    region: process.env.S3_REGION
  }
});
