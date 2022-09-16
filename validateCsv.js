const { checkAllValues } = require("./checkAllValues");
const { checkForSpecialChar } = require("./functions/checkForSpecialChar");

const { csvToJson } = require("./functions/csvToJson");
// const csvRules = require('./csvRules')

const csvFile = process.argv[2];

const validateCsv = async (file) => {
  // no special characters
  // max length
  validationArray = []; // if all bools pushed to array are true, validateCsv returns true

  const passCharCheck = await checkForSpecialChar(file);
  validationArray.push(passCharCheck);

  const allValuesPresent = await checkAllValues(file);
  validationArray.push(allValuesPresent);
};

validateCsv(csvFile);
