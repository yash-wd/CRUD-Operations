const Note = require("./Note");

// create a new note in database
function createNote(req, res) {
  if (!req.body.content) {
    return res.status(400).json({
      message: "Invalid Data",
    });
  }

  // create a note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content,
  });

  // save to DB
  note
    .save()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error("Error while saving:", err);
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Note",
      });
    });
}

// Retrieve and return all notes from the database
function findAllNotes(req, res) {
  Note.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error("Error while fetching all the notes:", err);
      res.status(500).json({
        message: err.message || "Some error occurred while fetching the Notes",
      });
    });
}

// fetch one  note
function findNote(req, res) {
  Note.findById(req.params.id)
    .then(function (data) {
      if (!data) {
        return res.status(404).json({
          message: "Note not found with id:" + req.params.id,
        });
      }
      res.json(data);
    })
    .catch(function (err) {
      console.error("Error while finding Note by Id", err);
      res.status(500).json({
        message: err.message || "Some error while fetching the Note",
      });
    });
}

// update a note identified by noteId in the request
function updateNote(req, res) {
  const filter = { title: req.body.title };
  const newData = { title: req.body.title, content: req.body.content };
  Note.findOneAndUpdate(filter, newData, { upsert: true })
    .then(function (data) {
      return res.json(newData);
    })
    .catch(function (err) {
      console.error("Error while updating the Note");
      res.status(500).json({
        message: err.message || "Some error occurred while updating the Note",
      });
    });
}

// delete a note by Id
function deleteNote(req, res) {
  Note.findByIdAndDelete(req.params.id)
    .then(function (data) {
      if (!data) {
        return res.status(404).json({
          message: "Note not found with Id:" + req.params.id,
        });
      }
      res.json({
        message: "Note successfully deleted with Id:" + req.params.id,
      });
    })
    .catch(function (err) {
      return res
        .status(500)
        .json({ message: err.message || "Not able to delete" });
    });
}

module.exports = {
  createNote,
  findAllNotes,
  findNote,
  deleteNote,
  updateNote,
};
