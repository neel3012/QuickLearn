const express = require('express');
const router = express.Router();
const {registerTutor} = require('../controller/tutorController.js');

router.post('/joinasteacher', registerTutor);

module.exports = router;
