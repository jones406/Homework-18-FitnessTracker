const router = require('express').Router();
const db = require('../models');
const {Workout} = require('../models');

router.get ("/api/workouts", async (req, res) => {
    const allWorkouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ])
    res.json(allWorkouts)
  });

router.put ('/api/workouts/:id', (req, res) => {
    console.log(req.body);
    Workout.findOneAndUpdate({_id:req.params.id}, {$push:{exercises:req.body}}, {new:true})
    .then(dbexercises => {
        console.log(dbexercises);
        res.json(dbexercises);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post ('/api/workouts', ({body}, res) => {
    Workout.create(body)
    .then(data => {res.json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


router.get ("/api/workouts/range", async (req, res) => {
    const allWorkouts = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration"
          }
        }
      }
    ]).sort({_id: -1}).limit(7)
    res.json(allWorkouts)
  });

module.exports = router