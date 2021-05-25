const router = require('express').Router();
const { Workout, Exercise } = require('../../models');

router.get('/', (req, res) =>
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => res.status(400).json(err))
);

router.post('/', ({ body }, res) =>
  Workout.create(body)
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => res.status(400).json(err))
);

router.put('/:id', ({ params, body }, res) =>
  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { excercises: body } },
    { upsert: true, useFindandModify: false }
  ).then((updatedWorkout) => res.json(updatedWorkout))
);

module.exports = router;
