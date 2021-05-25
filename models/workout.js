const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'tell me something',
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
