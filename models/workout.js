const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: [
    {
      type: { type: String },
      name: String,
      distance: Number,
      duration: Number,
      weight: Number,
      sets: Number,
      reps: Number,
    },
  ],
});
const Workout = mongoose.model('Workout', workoutSchema);

const totals = Workout.aggregate([
  {
    $set: {
      totalDuration: { $sum: '$exercises.duration' },
    },
  },
]);
console.log(totals._pipeline[0]['$set']);

module.exports = Workout;
