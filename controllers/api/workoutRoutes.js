const router = require('express').Router();
const { Workout } = require('../../models');

router.get('/', (req, res) =>
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => res.status(400).json(err))
);

router.post('/', ({ body }, res) => {
  console.log('post route hit');
  return Workout.create(body)
    .then((dbWorkout) => res.json(dbWorkout))
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.put('/:_id', ({ params, body }, res) => {
  console.log(body);
  Workout.findOneAndUpdate(
    { _id: params._id },
    { $push: { exercises: body } },
    { upsert: true, useFindandModify: false },
    (err, res) => (err ? console.log(err) : console.log(res))
  );
});

module.exports = router;
