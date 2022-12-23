const express = require("express");
const bodyParser = require("body-parser");

// creating express app here
const app = express();

// bodyParser (it is a middle-ware) to parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// setting up the mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://0.0.0.0:27017/notes")
  .then(function () {
    console.log("Successfully connected to Database");
  })
  .catch(function (err) {
    console.log("Could not connect to DB. Exiting now...", err);
    process.exit();
  });

// importing controller.js to access it
const controller = require("./controller");

// creating route for testing purpose
app.get("/", function (req, res) {
  res.send("Hello World");
});

// create operation
app.post("/create", function (req, res) {
  controller.createNote(req, res);
});

// get all notes
app.get("/notes", function (req, res) {
  controller.findAllNotes(req, res);
});

// get node by id
app.get("/note/:id", function (req, res) {
  controller.findNote(req, res);
});

// update note
app.put("/update", function (req, res) {
  controller.updateNote(req, res);
});

// delete note
app.delete("/delete/:id", function (req, res) {
  controller.deleteNote(req, res);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
