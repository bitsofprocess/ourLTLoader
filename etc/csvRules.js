module.exports= {
  "properties": {
    "question": {
      "type": "string",
      "maximum": 40
    },
    "correct_answer": {
      "type": "string",
      "maximum": 40,
      "pattern": "[a-zA-Z0-9?]"
    },
    "wrong_answer_1": {
      "type": "string",
      "maximum": 40,
      "pattern": "[a-zA-Z0-9]"

    },
    "wrong_answer_2": {
      "type": "string",
      // "maximum": 40,
      // "pattern": "[a-zA-Z0-9]"
    },
    "wrong_answer_3": {
      "type": "string",
      "maximum": 40,
      "pattern": "[a-zA-Z0-9]"
    }
  },
  "required": [
    "question",
    "correct_answer",
    "wrong_answer_1",
    "wrong_answer_2",
    "wrong_answer_3"
  ]
}
