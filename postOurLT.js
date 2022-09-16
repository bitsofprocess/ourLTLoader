const { validateCsv } = require("./mainFunctions/validateCsv");

const csvFile = process.argv[2];

const postOurtLT = async (file) => {
  // pull in data, check existing titles

  const allDataPresent = await validateCsv(file);

  if (!allDataPresent) {
    console.log("CSV failed Validation");
  } else {
    //     const structuredQuestions = await assignIndexes(file);
    //     const questionArray = await createQuestionArray(structuredQuestions);
    //     // pull in current data
    //     const newSetId = await getNewSetId(team_id); // get existing questions sets and add 1 to highest set id
    //     const wrappedArray = await wrapArray(newSetId, owner, title, questionArray);
    //     // add new object to question sets
    //     const success = await addToDynamo(team_id, wrappedArray);
  }
};

postLT(csvFile);
