const BadgeModel = require('../models/badge.model');

class BadgeController {
  // get all badges or filter by skill
  static getBadges(req, res) {
    try {
      const { skill } = req.query;

      if (skill) {
        const badges = BadgeModel.getBySkill(skill);
        return res.status(200).json(badges);
      }

      const badges = BadgeModel.getAll();
      return res.status(200).json(badges);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // create a new badge
  static createBadge(req, res) {
    try {
      const { title, skill, userId } = req.body;

      // validation
      if (!title || !skill || !userId) {
        return res.status(400).json({ 
          error: 'missing required fields',
          required: ['title', 'skill', 'userId']
        });
      }

      const newBadge = BadgeModel.create({ title, skill, userId });
      return res.status(201).json(newBadge);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  }
}

module.exports = BadgeController;
