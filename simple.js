"use strict";

var AWS = require("aws-sdk");
// const { DynamoDB } = require('serverless-dynamodb-client');

// then use it as a standard DynamoDB client
// const { DynamoDB } = require('serverless-dynamodb-client');


new AWS.DynamoDB({
  LOCAL_DDB_HOST: "localhost",
  LOCAL_DDB_PORT: "8000",
  LOCAL_DDB_ENDPOINT: "http://localhost:8000",
});

// let options = {}

// if (process.env.IS_OFFLINE) {
//   options = {
//     region: 'localhost',
//     endpoint: 'http://localhost:8000'
//   }
// }

const dynamodb = new AWS.DynamoDB.DocumentClient();


module.exports.simple = async (event, context, callback) => {
  var params = {
    TableName: "ourLT-prod",
  };

  let tableData;

  try {
    let dbResponse = await dynamodb
      .scan(params)
      .promise()
      .then((data) => tableData = JSON.stringify(data));
  
  } catch (err) {
    console.log(err);
  }

  const response = {
    statusCode: 200,
    body: tableData,
  };


  callback(null, response);
};
