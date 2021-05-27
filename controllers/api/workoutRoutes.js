const router = require('express').Router();
const { Workout } = require('../../models');

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

router.put('/:_id', ({ params, body }, res) =>
  Workout.findOneAndUpdate(
    { _id: params._id },
    { $push: { exercises: body } },
    { upsert: true, useFindandModify: false },
    (err, res) => (err ? console.log(err) : console.log(res))
  )
);

router.get('/range', (req, res) =>
  Workout.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
);

module.exports = router;
