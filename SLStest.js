"use strict";

const { postWithS3 } = require("./postWithS3");

var AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.simple = async (event, context, callback) => {
  const {file, title, owner, team_id} = JSON.parse(event.body);
  console.log(event);
  let result;

  try {
   
    result = postWithS3(file, dynamodb, title, owner, team_id);
  
  } catch (err) {
    console.log(err);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  };


  callback(null, response);
};