const csv = require("csvtojson");

module.exports.csvToJson = async (csvFilePath) => {
  try {
    const data = await csv().fromFile(csvFilePath);

    // log the JSON array
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports.assignIndexes = async (questionsArray) => {
  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  let newJson = questionsArray.map((question) => {
    const correct_answer = generateRandomInteger(4);
    const incorrectAnswerArray = [
      question.wrong_answer_1,
      question.wrong_answer_2,
      question.wrong_answer_3,
    ];

    let shuffledAnswers = incorrectAnswerArray.sort(
      (a, b) => 0.5 - Math.random()
    );
    shuffledAnswers.splice(correct_answer, 0, question.correct_answer);

    const json = {
      question: question.question,
      correct_answer: correct_answer,
      answers: shuffledAnswers,
    };

    return json;
  });

  return newJson;
};

module.exports.getNewSetId = async (dynamoTable) => {
  const questionSets = dynamoTable[0].question_sets;

  let existingSetIds = [];

  questionSets.forEach((set) => existingSetIds.push(set.set_id));

  const newSetId = Math.max(...existingSetIds) + 1;

  return newSetId;
};

module.exports.wrapQuestionSet = async (
  newSetId,
  owner,
  title,
  structuredQuestions
) => {
  let obj = {
    set_id: newSetId,
    owner: owner,
    title: title,
    questions: structuredQuestions,
  };

  return obj;
};

module.exports.addToExistingTable = async (wrappedQuestionSet, dynamoTable) => {
  const newTable = dynamoTable[0];
  newTable.question_sets.push(wrappedQuestionSet);

  return newTable.question_sets;
};