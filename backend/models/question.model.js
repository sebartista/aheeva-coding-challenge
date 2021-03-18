module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        id: String,
        question: String,
        options: Array[{
            label: String,
            value: String,
            isCorrect: boolean
        }]        
      },
      { timestamps: true }
    );
  
    // override __id with id and return the objecto for json calls
    // schema.method("toJSON", function () {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
    const Question = mongoose.model("question", schema);
    return Question;
  };
  