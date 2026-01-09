const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// get all users or filter by role (query param)
router.get('/', UserController.getUsers);

// get user by id (route param)
router.get('/:id', UserController.getUserById);

// create a new user
router.post('/', UserController.createUser);

module.exports = router;
