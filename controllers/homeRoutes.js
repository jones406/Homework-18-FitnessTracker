const router = require('express').Router();
const path = require('path');
// const Workout = require('../models/Workout');
// const db = require('../models');

router.get('/stats', (req, res) =>
res.sendFile(path.join(__dirname, "../public/index.html"))
);

// router.get("/exercise", (req, res) => 