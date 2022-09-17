const { maxLengthCheck } = require("../subFunctions/maxLengthCheck");
const { checkAllValues } = require("../subFunctions/checkAllValues");
const { checkForSpecialChar } = require("../subFunctions/checkForSpecialChar");
const { compareTitles } = require('../compareTitles');

const { csvToJson } = require("../subFunctions/csvToJson");

const csvFile = process.argv[2];

module.exports.validateCsv = async (file, title, dynamoTable) => {
  const questionsArray = await csvToJson(file);
  let validationArray = []; // if all bools pushed to array are true, validateCsv returns true
  let csvPassesValidation;

  const passesCharCheck = await checkForSpecialChar(questionsArray);
  validationArray.push(passesCharCheck);

  const allValuesPresent = await checkAllValues(questionsArray);
  validationArray.push(allValuesPresent);

  const passesLengthCheck = await maxLengthCheck(questionsArray);
  validationArray.push(passesLengthCheck);

  const passesTitleCheck = await compareTitles(dynamoTable, title);
  validationArray.push(passesTitleCheck);

  if (validationArray.includes(false)) {
    csvPassesValidation = false;
  } else {
    csvPassesValidation = true;
  }
  return csvPassesValidation;

};
