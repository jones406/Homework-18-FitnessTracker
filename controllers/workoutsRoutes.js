const router = require('express').Router();
const db = require('../models');
const {Workout} = require('../models');

router.get ('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        },
    ]).sort({day:1})
    .then(work => {
        res.json(work);
    })
    .catch(err => {
        res.status(400).json(err);
    });
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
})


module.exports = router