const router = require("express").Router();
const db = require("../models");

// db.Workout.create({ name: "Campus Library" })
//   .then((dbWorkout) => {
//     console.log(dbWorkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

//find most recent workout
router.get("/api/workouts", (req, res) => {
  db.Workout.findOne({})
    .sort({ day: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//add one exercise
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      // $inc: {totalDuration: req.body.duration},
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
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
      res.json(err);
    });
});

//get workouts from last 7 days
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .sort({ day: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
