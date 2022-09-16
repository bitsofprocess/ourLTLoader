// const csval = require('csval');
// const CSV = require('csv-string');
// var validate = require('jsonschema').validate;
// const CsvReadableStream = require('csv-reader');
// const Fs = require('fs');

const { checkForSpecialChar } = require('./checkForSpecialChar');

const { csvToJson } = require("./functions/csvToJson");
// const csvRules = require('./csvRules')

const csvFile = process.argv[2];

const checkIfAllDataPresent = async (file) => {
  // no special characters
  // max length

  const passCharCheck = await checkForSpecialChar(file);

};

checkIfAllDataPresent(csvFile)