const { maxLengthCheck } = require("../subFunctions/maxLengthCheck");
const { checkAllValues } = require("../subFunctions/checkAllValues");
const { checkForSpecialChar } = require("../subFunctions/checkForSpecialChar");
const { compareTitles } = require("../compareTitles");

const { csvToJson } = require("../subFunctions/csvToJson");

const csvFile = process.argv[2];

module.exports.validateCsv = async (file, title, dynamoTable) => {
  const questionsArray = await csvToJson(file);
  let validationArray = []; // if all bools pushed to array are true, validateCsv returns true
  let passesCharCheck;
  let allValuesPresent;
  let passesLengthCheck;
  let passesTitleCheck;
  let validationCriteria = {
    passesCharCheck,
    allValuesPresent,
    passesLengthCheck,
    passesTitleCheck
  }
 

  validationCriteria.passesCharCheck = await checkForSpecialChar(questionsArray);
  // validationArray.push(passesCharCheck);

  validationCriteria.allValuesPresent = await checkAllValues(questionsArray);
  // validationArray.push(allValuesPresent);

  validationCriteria.passesLengthCheck = await maxLengthCheck(questionsArray);
  // validationArray.push(passesLengthCheck);

  validationCriteria.passesTitleCheck = await compareTitles(dynamoTable, title);
  // validationArray.push(passesTitleCheck);


  return validationCriteria;
  // if (validationArray.includes(false)) {
  //   csvPassesValidation = false;
  // } else {
  //   csvPassesValidation = true;
  // }
  // return csvPassesValidation;
  // return validationCriteria
};
