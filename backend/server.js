const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8181"
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
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
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

// mySeeder();
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