const router = require('express').Router();
const FormController = require('../controllers/form.controller');

router.get('/register', FormController.register);
router.get('/login', FormController.login);
router.get('/logout', FormController.logout);
router.get('/dashboard', FormController.userAuth, FormController.getDashboard);

router.post('/getDetails', FormController.getDetails);
router.post('/index', FormController.index);
// router.post('/showDashboard', FormController.userAuth, FormController.showDashboard);

module.exports = router;