
const axios = require('axios');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const newline = '\r\n';

const fields = ['category','difficulty','question','correct_answer','answers','json'];

const filename = "trivia.csv";

const url = "https://opentdb.com/api.php?amount=50&type=multiple";
const GetData = async () => {
    const res = await axios.get(url);
    // console.log(res.data.results);
    const questions = res.data.results;
    let toCsv = questions.map(question => {
        const correct_answer = generateRandomInteger(0,3);
        let shuffledAnswers = question.incorrect_answers.sort((a, b) => 0.5 - Math.random());
        shuffledAnswers.splice(correct_answer, 0, question.correct_answer);
        const json = {
            category: question.category,
            difficulty: question.difficulty,
            question: question.question,
            correct_answer: correct_answer,
            answers: shuffledAnswers
        };
        const obj = {
            category: question.category,
            difficulty: question.difficulty,
            question: question.question,
            correct_answer: question.correct_answer,
            wrong_answer_1: question.incorrect_answers[0],
            wrong_answer_2: question.incorrect_answers[1],
            wrong_answer_3: question.incorrect_answers[2],
            json: json
        };
        return obj;
    });
    // console.log(toCsv);
    fs.stat(filename, function (err, stat) {
        if (err) {
            console.log("New file, writing headers");
            writeFields = fields + newline;
            fs.writeFile(filename, writeFields, function (err) {
                if (err) throw err;
                console.log("file saved");
            });
        }
        const csv = json2csv(toCsv) + newline;
        fs.appendFile(filename, csv, function (err) {
            if (err) throw err;
            console.log("Data Appended");
        });
    });
    return toCsv;
}

function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

GetData();