const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "What's the exercise type?",
  },
  name: {
    type: String,
    trim: true,
    required: "What's the exercise called?",
  },
  duration: {
    type: Number,
    required: "How long did you do the exercise?",
  },
  weight: {
    type: Number,
    required: "How much weight was used?",
  },
  reps: {
    type: Number,
    required: "How many times did you do the exercise in each set?",
  },
  sets: {
    type: Number,
    required: "How many sets did you do?",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
