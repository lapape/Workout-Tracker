const router = require("express").Router();
const db = require("../models");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

db.Workout.create({ name: "Campus Library" })
  .then((dbWorkout) => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.post("/submit", ({ body }, res) => {
  db.Book.create(body)
    //promise gives us the object of the newly created book
    //push new book into the library
    //new true returns the updated library vs the unupdated one
    .then(({ _id }) =>
      db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true })
    )
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/books", (req, res) => {
  db.Book.find({})
    .then((dbBook) => {
      res.json(dbBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/library", (req, res) => {
  db.Library.find({})
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Library.find({})
    .populate("books")
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
