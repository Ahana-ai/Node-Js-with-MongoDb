const router = require('express').Router();
const empController = require('../controllers/employee.controller');

//Taking Data Inputs
router.get('/', empController.index);
// router.get('/listing', empController.listing);

//Inserting the inputs in database
router.post('/insert', empController.insert);

module.exports = router;