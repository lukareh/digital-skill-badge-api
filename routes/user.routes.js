const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

// get all users or filter by role (query param)
router.get('/', UserController.getUsers);

// get user by id (route param)
router.get('/:id', UserController.getUserById);

// create a new user
router.post('/', UserController.createUser);

// update user (put - full update)
router.put('/:id', UserController.updateUser);

// partial update user (patch)
router.patch('/:id', UserController.patchUser);

// delete user
router.delete('/:id', UserController.deleteUser);

module.exports = router;
