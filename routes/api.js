const router = require("express").Router();
const Exercise = require("../models/exercises.js");
const Workout = require("../models/workouts");

router.put("/workouts/:id", (req, res) => {
  // console.log(req.body);

  Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/workouts", (req, res) => {
  Workout.create({
    day: Date.now(),
  })
    .then((dbTransaction) => {
      res.json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", (req, res) => {
  let range = new Date();
  range.setDate(range.getDate() - 7);
  console.log(`The date range is greater than ${range}`);
  Workout.aggregate([
    { $match: { day: { $gte: range } } },
    {
      $addFields: {
        day: "$day",
        totalDuration: { $sum: "$exercises.duration" },
        totalweight: { $sum: "$exercises.weight" },
      },
    },
    // {
    // $group: {
    // _id: {
    //   year: { $year: "$day" },
    //   month: { $month: "$day" },
    //   day: { $dayOfMonth: "$day" },
    // },
    //   totalDuration: { $sum: "exercises.$.duration" },
    //   totalweight: { $sum: "exercises.$.weight" },
    // },
    // },
  ])
    .sort({ _id: -1 })
    .then((dbTransaction) => {
      console.log("Workouts in range...");
      console.log(dbTransaction);
      res.status(200).json(dbTransaction);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  // res.status(200).json(workoutData);
});
module.exports = router;
