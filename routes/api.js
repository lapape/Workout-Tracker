const router = require("express").Router();
const db = require("../models");

//find most recent workout
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//add one exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//create new workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//get workouts from last 7 days
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate()
    .addFields({ totalDuration: { $sum: "$exercises.duration" } })
    .limit(7)
    .sort({ day: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
module.exports = router;
