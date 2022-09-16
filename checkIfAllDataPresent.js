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

    const questionArray = await csvToJson(file);
    const element = questionArray[1];
    let valueCheck = [];
    let passedValueCheck;

    questionArray.forEach(element => {
        const valuesArray = Object.values(element);

        if (valuesArray.includes('')) {
            valueCheck.push('false');
        } else {
            valueCheck.push('true');
        }

  

    }) 
    
    if (valueCheck.includes('false')) {
        passedValueCheck = false;
    }

    console.log(passedValueCheck)

};

checkIfAllDataPresent(csvFile)