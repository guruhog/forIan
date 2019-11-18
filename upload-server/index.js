require('dotenv').config();
const { PORT, microServiceName, s3Config, nodeEnv } = require('./config');
const body_parser = require('body-parser');
const AWS = require('aws-sdk');
const uuid = require('uuid');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const https = require('https');

const app = require('express')();

app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.post('/upload', async (req, res) => {
  const { fileExtension } = req.body;

  const s3 = new AWS.S3({
    accessKeyId: s3Config.accessKey,
    secretAccessKey: s3Config.secretAccessKey,
    signatureVersion: s3Config.signatureVersion,
    region: s3Config.region
  });

  const Key = `${uuid()}.${fileExtension}`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'mebchat',
      Key
    },
    (err, url) => {
      if (err) return res.status(400).send(err);

      res.json({ url, filename: Key });
    }
  );
});

let server;
if (nodeEnv === 'development') {
  server = http.createServer(app);
} else {
  const key = fs.readFileSync('./ssl/key_upload-server-ag.statwb-dev.eu.novartis.net.pem');
  const cert = fs.readFileSync('./ssl/cert_upload-server-ag.statwb-dev.eu.novartis.net.pem');

  server = https.createServer({ key, cert }, app);
}

server.listen(PORT, () => console.log(`${microServiceName} started at ${PORT}`));
