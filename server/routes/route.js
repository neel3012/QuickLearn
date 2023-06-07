const express = require('express');
const router = express.Router();
const {registerTutor,loginteacher} = require('../controller/tutorController.js');

router.post('/joinasteacher', registerTutor);
router.post('/teacherlogin',loginteacher)

module.exports = router;
