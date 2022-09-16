const { checkAllValues } = require("./subFunctions/checkAllValues");
const { checkForSpecialChar } = require("./subFunctions/checkForSpecialChar");

const { csvToJson } = require("./subFunctions/csvToJson");

const csvFile = process.argv[2];

const validateCsv = async (file) => {
  // no special characters
  // max length
  const questionsArray = await csvToJson(file)
  validationArray = []; // if all bools pushed to array are true, validateCsv returns true

  const passCharCheck = await checkForSpecialChar(questionsArray);
  validationArray.push(passCharCheck);

  const allValuesPresent = await checkAllValues(questionsArray);
  validationArray.push(allValuesPresent);

  console.log(validationArray)
};

validateCsv(csvFile);
