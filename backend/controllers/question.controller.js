const db = require("../models");
const Question = db.questions;

// // Create and Save a new Callcenter
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.name) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   // Create a Callcenter
//   const question = new Question({
//     name: req.body.name,
//     provides: req.body.provides,
//     phone: req.body.phone,
//     published: req.body.published ? req.body.published : false
//   });

//   // Save Tutorial in the database
//   question
//     .save(question)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Question."
//       });
//     });
// };

// // Retrieve all Question from the database.
// exports.findAll = (req, res) => {
//     const name = req.query.name;
//     var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

//     Question.find(condition)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
// };

exports.getQuestion = (req, res) => {
  //TODO:: filter set of ids already answered

  //TODO:: populate answered questions array for comparing and retrieving not answered questions
  var answered = [];
  
  //make a comma array for query.
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
        // TODO:: get the answer from the array and return isCorrect
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
}

// Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Question.findById(id)
//       .then(data => {
//         if (!data)
//           res.status(404).send({ message: "Not found Question with id " + id });
//         else res.send(data);
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .send({ message: "Error retrieving Question with id=" + id });
//       });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//           message: "Data to update can not be empty!"
//         });
//       }

//       const id = req.params.id;

//       Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//           if (!data) {
//             res.status(404).send({
//               message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
//             });
//           } else res.send({ message: "Tutorial was updated successfully." });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message: "Error updating Tutorial with id=" + id
//           });
//         });
// };

// Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Question.findByIdAndRemove(id)
//       .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
//           });
//         } else {
//           res.send({
//             message: "Question was deleted successfully!"
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Question with id=" + id
//         });
//       });
// };

// Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Question.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Question were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Question."
//       });
//     });
// };

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Question.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };