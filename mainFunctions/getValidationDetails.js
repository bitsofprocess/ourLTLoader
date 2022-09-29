// const { maxLengthCheck } = require("../subFunctions/maxLengthCheck");
// const { checkAllValues } = require("../subFunctions/checkAllValues");
// const { checkForSpecialChar } = require("../subFunctions/checkForSpecialChar");
// const { compareTitles } = require("../subFunctions/compareTitles");

const { maxLengthCheck, checkAllValues, checkForSpecialChar, compareTitles } = require('../subFunctions/validationFunctions');

const { csvToJson } = require("../subFunctions/csvToJson");

const csvFile = process.argv[2];

module.exports.getValidationDetails = async (questionsArray, title, dynamoTable) => {
  // const questionsArray = await csvToJson(file);

  let passesCharCheck;
  let allValuesPresent;
  let passesLengthCheck;
  let passesTitleCheck;
  let validationCriteria = {
    passesCharCheck,
    allValuesPresent,
    passesLengthCheck,
    passesTitleCheck,
  };

  validationCriteria.passesCharCheck = await checkForSpecialChar(
    questionsArray
  );

  validationCriteria.allValuesPresent = await checkAllValues(questionsArray);

  validationCriteria.passesLengthCheck = await maxLengthCheck(questionsArray);

  validationCriteria.passesTitleCheck = await compareTitles(dynamoTable, title);

  return validationCriteria;
};
