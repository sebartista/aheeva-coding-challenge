module.exports = app => {
    const questions = require("../controllers/question.controller.js");
  
    var router = require("express").Router();

    // Retrieve one question
    router.get("/question", questions.getQuestion);

    // Validate one question
    router.get("/validate", questions.validateQuestion);
    
    app.use('/api/questions', router);
  };