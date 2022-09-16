// const csval = require('csval');
// const CSV = require('csv-string');
// var validate = require('jsonschema').validate;
// const CsvReadableStream = require('csv-reader');
// const Fs = require('fs');

const {
  questionHasSpecialCharacters,
  answerHasSpecialCharacters,
} = require("./specialCharCheck");

const { csvToJson } = require("./functions/csvToJson");
// const csvRules = require('./csvRules')

const csvFile = process.argv[2];

const checkIfAllDataPresent = async (file) => {
  // no special characters
  // max length

  const requiredKeys = [
    "question",
    "correct_answer",
    "wrong_answer_1",
    "wrong_answer_2",
    "wrong_answer_3",
  ];


  const questionsArray = await csvToJson(file);
  const element = questionsArray[0];
  let validationArray = []
  let failedValidation
  questionsArray.forEach(element => {
  for (const key of requiredKeys) {
    if (key === "question") {
        let result = questionHasSpecialCharacters(element[key])
        validationArray.push(result)
    } else if (key === "wrong_answer_1" || "wrong_answer_2" || "wrong_answer_3") {
        let result = answerHasSpecialCharacters(element[key])
        validationArray.push(result)
    }
    } 

    })

    if (validationArray.includes(true)) {
        failedValidation = 'true'
    }
    console.log(failedValidation)
//       if (answerHasSpecialCharacters(element[key])) {
//         // return 'true'
//         console.log(`${key} : true`);
//       } else {
//         //return 'false'
//         console.log("false");
//       }
//     } else {
//         if (key === "question") {
//             if (questionHasSpecialCharacters(element[key])) {
//                 console.log(`${key} : true`);
//             } else {
//                 console.log(`${key} : false`);
//             }
//         }
//       }
  } 
// };

checkIfAllDataPresent(csvFile);
