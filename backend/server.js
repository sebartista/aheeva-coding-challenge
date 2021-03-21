const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var mock_data = require("./config/questions.json");

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    //drop de database and reseed
    seedDatabase();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//should empty the database and reload everything.
// async function mySeeder() {
//   const data = await MyModel.find({}).limit(1).exec();
//   if (data.length !== 0) {
//       // Data exists, no need to seed.
//       console.log("data exists, continue");
//       return;
//   }
//   //const seed = new MyModel({...});

//   // some other seed logic
//   // ...

//   //await seed.save();
// }

async function seedDatabase() {
  //check if there is data in the database
  const existing_data = await db.questions.find({}).limit(1).exec();
  if (existing_data.length !== 0) {
    // Data exists, no need to seed.
    console.log("data exists, continue");
    return;
  }
  //if there is no data, drop de collection. (DELETE THIS)
  // db.mongoose.connection.dropCollection("questions", function (err, result) {
  //   console.log("collection Dropped");

    //format json to match object Question
    var the_questions = mock_data.results.map(function (q) {
      var options = [];
      q.incorrect_answers.forEach(function (o) {
        options.push({ label: o, value: o, isCorrect: false });
      });
      options.push({
        label: q.correct_answer,
        value: q.correct_answer,
        isCorrect: true,
      });

      return { question: q.question, options: options };
    });

    db.questions
      .insertMany(the_questions)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
  //});
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "We are at home." });
});

require("./routes/question.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8180;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
