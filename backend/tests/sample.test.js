const app = require("../server");
const question = require("../models/question.model")
const mongoose = require("mongoose");
const supertest = require("supertest");

// beforeEach((done) => {
//   mongoose.connect("mongodb://localhost:27017/jest_db",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => done());
// });

// afterEach((done) => {    
//     mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done())
//   });
// });

test("GET /api/questions", async () => {
    const schema = new mongoose.Schema({ question: 'string', id: 'string', options:[{label:'string', value : 'string', isCorrect : false}] });

    const Question = mongoose.model('Question', schema);

    const thequestion = await Question.create({ question: "question data", id: "shdfasfuh", options: [{label: "label", value: "value", isCorrect : false}] });
  
    // await supertest(app).get("/api/questions")
    //   .expect(200)
    //   .then((response) => {
    //     // Check type and length
    //     expect(Array.isArray(response.body)).toBeTruthy();
    //     expect(response.body.length).toEqual(1);
  
    //     // Check data
    //     expect(response.body[0]._id).toBe(thequestion.id);
    //     expect(response.body[0].question).toBe(thequestion.question);
    //     //expect(response.body[0].answer).toBe(question.answer);
    //   });
  });