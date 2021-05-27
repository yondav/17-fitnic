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
  Workout.aggregate(
    [
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
          combinedWeight: {
            $sum: '$exercises.weight',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  )
);

module.exports = router;
