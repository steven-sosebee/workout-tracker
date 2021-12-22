const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "What's the exercise called?",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: {
    type: Array,
  },
});

const Workout = mongoose.model("Workout", exerciseSchema);

module.exports = Workout;
