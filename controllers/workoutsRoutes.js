const router = require('express').Router();
const db = require('../models');
const {Workout} = require('../models');

router.get ('/api/workouts', async (req, res) => {
    await Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        },
    ]).sort({day:1})
    .then(work => {
        res.json(work)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.post ('/api/workouts/:id', (req, res) => {
    Workout.create({})
    .then(dbexercises => {
        console.log(dbexercises);
        res.json(dbexercises);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


module.exports = router