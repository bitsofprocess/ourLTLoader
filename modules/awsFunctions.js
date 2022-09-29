// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

module.exports.getDynamoTable = async (dynamodb) => 
{

  var params = {
      TableName: "ourLT-prod"
  }

  try {
      const data = await dynamodb.scan(params).promise();
      return data.Items;
      
    }
  catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    };
  } 
 
};

module.exports.addToDynamo = async (team_id, updatedTable, dynamodb) => {
    let params = {
        RequestItems: {
          'ourLT-prod': [
            {
              PutRequest: {
               Item: {
                team_id: team_id,
                question_sets: updatedTable
               }
              }
            }
          ]
        }
      }
  
  
      try {
        res = await dynamodb.batchWrite(params).promise()
        let data = res;
        console.log('Processed: ', JSON.stringify(params, null, 3))
      } catch(err) {
        console.log(err)
      }
};