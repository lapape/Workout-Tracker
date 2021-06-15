const router = require("express").Router();
const db = require("../models");

db.Workout.create({ name: "Workout Tracker" })
  .then((Workout) => {})
  .catch(({ message }) => {
    console.log(message);
  });

router.post("/api/workouts", ({ body }, res) => {
  db.Excercise.create(body)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        {},
        { $push: { excercises: _id } },
        { new: true }
      )
    )
    .then((Workout) => {
      res.json(Workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/library", (req, res) => {
  db.Library.find({})
    .then((dbLibrary) => {
      res.json(dbLibrary);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/populated", (req, res) => {
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
