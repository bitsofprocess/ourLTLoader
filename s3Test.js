const csv = require("csvtojson");

const AWS = require("aws-sdk");
var s3 = new AWS.S3();

module.exports.getCsvFromS3 = async () => {

    const params = {
        Bucket: 'boptestfiles',
        Key: 'games/ourLT/test.csv',
      };
    // get csv file and create stream
    const stream = s3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    return json;
  };
