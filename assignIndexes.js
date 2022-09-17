module.exports.assignIndexes = async (questionsArray) => {
    
    function generateRandomInteger(max) {
        return Math.floor(Math.random() * max);
      }
    
      let newJson = questionsArray.map((question) => {
      const correct_answer = generateRandomInteger(4);
      const incorrectAnswerArray = [question.wrong_answer_1, question.wrong_answer_2, question.wrong_answer_3]
    
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