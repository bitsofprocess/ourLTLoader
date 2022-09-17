const { csvToJson } = require("./subFunctions/csvToJson");
const { getDynamoTable } = require("./mainFunctions/getDynamoTable");
const {
  getValidationDetails,
} = require("./mainFunctions/getValidationDetails");
const { validateCriteria } = require("./validateCriteria");

const csvFile = process.argv[2];
const tableName = "ourLT-prod";
const myCredentials = {
  accessKeyId: process.argv[3],
  secretAccessKey: process.argv[4],
};

// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

// Set the region
AWS.config = new AWS.Config({
  credentials: myCredentials,
  region: "us-east-1",
});

// Create DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient();

// tableName, dynamodb, title,

const postOurtLT = async (file, tableName, dynamodb, title) => {
  const questionsArray = await csvToJson(file);

  // pull in data, check existing titles

  const dynamoTable = await getDynamoTable(tableName, dynamodb);

  const validationCriteriaObject = await getValidationDetails(
    questionsArray,
    title,
    dynamoTable
  );
  
  const allCriteriaValid = await validateCriteria(validationCriteriaObject);
 
  if (!allCriteriaValid) {
    console.log("CSV failed Validation");
  } else {
    console.log('Success')
    // let newJson = questionsArray.map((question) => {
    //   console.log(question)
    // const correct_answer = generateRandomInteger(0, 3);
    // let shuffledAnswers = question.incorrect_answers.sort(
    //   (a, b) => 0.5 - Math.random()
    // );
    // shuffledAnswers.splice(correct_answer, 0, question.correct_answer);
    // const json = {
    //   category: question.category,
    //   difficulty: question.difficulty,
    //   question: question.question,
    //   correct_answer: correct_answer,
    //   answers: shuffledAnswers,
    // };
    // const obj = {
    //   category: question.category,
    //   difficulty: question.difficulty,
    //   question: question.question,
    //   correct_answer: question.correct_answer,
    //   wrong_answer_1: question.incorrect_answers[0],
    //   wrong_answer_2: question.incorrect_answers[1],
    //   wrong_answer_3: question.incorrect_answers[2],
    //   json: json,
    // };
    //   return json;
    // });
    // const structuredQuestions = await assignIndexes(file);
    // const questionArray = await createQuestionArray(structuredQuestions);
    // // pull in current data
    // const newSetId = await getNewSetId(team_id); // get existing questions sets and add 1 to highest set id
    // const wrappedArray = await wrapArray(newSetId, owner, title, questionArray);
    // // add new object to question sets
    // const success = await addToDynamo(team_id, wrappedArray);
  }
};

const newTitle = "newTitle";
postOurtLT(csvFile, tableName, dynamodb, newTitle);
