const express = require('express');
const router = express.Router();
const BadgeController = require('../controllers/badge.controller');

// get all badges or filter by skill (query param)
router.get('/', BadgeController.getBadges);

// create a new badge
router.post('/', BadgeController.createBadge);

module.exports = router;
