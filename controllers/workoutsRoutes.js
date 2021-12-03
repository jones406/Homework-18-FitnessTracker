const router = require('express').Router();
// const db = require('../models');
// const {Workout} = require('../../models');

router.get ('/', async (req, res) => {
    const workoutData = await Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    res.json(workoutData)
});

router.post ('/', (req, res) => {
    Workout.create({})
    .then(dbexercises => {
        console.log(dbexercises);
        res.json(dbexercises);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});