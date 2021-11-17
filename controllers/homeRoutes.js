const router = require('express').Router();
const path = require('path');
const Workout = require('../models/Workout');
const db = require('../models');

router.get('/', (req, res) =>
res.sendFile(path.join(__direname, "../public/Workout"))
);

router.get("/exercise", (req, res) => 