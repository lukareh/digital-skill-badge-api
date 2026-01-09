const express = require('express');
const router = express.Router();
const BadgeController = require('../controllers/badge.controller');

// get all badges or filter by skill (query param)
router.get('/', BadgeController.getBadges);

// create a new badge
router.post('/', BadgeController.createBadge);

// update badge (put - full update)
router.put('/:id', BadgeController.updateBadge);

// partial update badge (patch)
router.patch('/:id', BadgeController.patchBadge);

// delete badge
router.delete('/:id', BadgeController.deleteBadge);

module.exports = router;
