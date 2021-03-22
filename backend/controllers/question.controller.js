const db = require("../models");
const Question = db.questions;

exports.getQuestion = (req, res) => {
  

  //populate answered questions array for comparing and retrieving not answered questions
  var answered = [];
  
  //make a comma array for query with answered options ids.
  if (req.query.answered) {
    answered = req.query.answered.split(',');
  }
  
  //count records
  var n = Question.countDocuments().then((count) => {
    //random for find
    var r = Math.floor(Math.random() * count);
    //Find where id not answered and random.     
    Question.find({}).where('_id').nin(answered).limit(1).skip(r).then(data => {
      if (!data) {
        res.status(404).send({
          message: "We do not have questions"
        });
      } else {        
        res.send(data);
      }
    }).catch(err => {
      // this is not ok, it should degrade gracefully
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving questions."
      });
    });
  });

};

// must querystring _id of answer
exports.validateQuestion = (req, res) => {

  const answer = req.query.answer;

  //should find by id, compare with option value and return
  Question.find({
      "options._id": answer
    })
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found Question with id " + id
        });
      else {
        // get the answer from the array and return isCorrect
        //not proud of this.
        var found_answer;
        data[0].options.forEach((option, index) => {
          if (option._id.toString() === answer) {
            found_answer = data[0].options[index];
          }
        });
        res.send(found_answer.isCorrect);
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving Question with id=" + answer
        });
    });
};