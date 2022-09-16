
const { validateCsv } = require('./validateCsv');
const { checkForSpecialChar } = require('./functions/checkForSpecialChar')

const csvFile = process.argv[2]

const postLT = async (file) => {

    // pull in data, check existing titles

    const allDataPresent = await validateCsv(file);

    console.log(allDataPresent)

    // if (!allDataPresent) {

    //     console.log(error)

    // } else {

    //     const structuredQuestions = await assignIndexes(file);

    //     const questionArray = await createQuestionArray(structuredQuestions);

    //     // pull in current data

    //     const newSetId = await getNewSetId(team_id); // get existing questions sets and add 1 to highest set id

    //     const wrappedArray = await wrapArray(newSetId, owner, title, questionArray);

    //     // add new object to question sets

    //     const success = await addToDynamo(team_id, wrappedArray);

    }

(postLT(csvFile))