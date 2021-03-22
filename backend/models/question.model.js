module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        question: String,
        options: [{
            label: String,
            value: String,
            isCorrect: Boolean
        }]        
      },
      { timestamps: true }
    );
  
    const Question = mongoose.model("question", schema);
    return Question;
  };
  