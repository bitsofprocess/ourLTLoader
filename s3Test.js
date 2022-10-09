const fastCsv = require('@fast-csv/parse');
const csv = require('csvtojson');

const AWS = require("aws-sdk");
var s3 = new AWS.S3();

async function getCsvFromS3() {

    const params = {
        Bucket: 'boptestfiles',
        Key: 'test.csv',
      };
    // get csv file and create stream
    const stream = s3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    console.log(json);
  };

getCsvFromS3();
