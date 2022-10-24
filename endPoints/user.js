var express = require('express');
var router = express.Router();
// Require the controllers WE CREATED!
var userController = require('../controller/userControllers');

router.post('/login', userController.login);
router.post('/addUser', userController.addUser);
router.get('/getAllUsers', userController.getAllUsers);
router.delete('/deleteUser', userController.deleteUser);
router.post('/filterUser', userController.filterUser);

module.exports = router;