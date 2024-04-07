const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint for creating a user
router.post('/create', userController.createUser);

router.get('/random', userController.getRandomUser);

router.get('/all', userController.getAllUsers);

router.get('/names', userController.getUserNames);

router.post('/exists', userController.checkUserExistenceHandler);

router.post('/above-age', userController.getUsersAboveAge);

module.exports = router;
