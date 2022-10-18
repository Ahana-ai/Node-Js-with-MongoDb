const router = require('express').Router();
const studentController = require('../controllers/students.controllers');

router.get('/', studentController.create);
router.post('/insert', studentController.insert);
router.get('/student-view', studentController.studentView);

module.exports = router;