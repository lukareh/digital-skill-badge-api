const BadgeModel = require('../models/badge.model');

class BadgeController {
  // get all badges or filter by skill
  static async getBadges(req, res) {
    try {
      const { skill } = req.query;

      if (skill) {
        const badges = await BadgeModel.getBySkill(skill);
        return res.status(200).json(badges);
      }

      const badges = await BadgeModel.getAll();
      return res.status(200).json(badges);
    } catch (error) {
      console.error('error in getBadges:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // create a new badge
  static async createBadge(req, res) {
    try {
      const { title, skill, userId } = req.body;

      // validation
      if (!title || !skill || !userId) {
        return res.status(400).json({ 
          error: 'missing required fields',
          required: ['title', 'skill', 'userId']
        });
      }

      const newBadge = await BadgeModel.create({ title, skill, userId });
      return res.status(201).json(newBadge);
    } catch (error) {
      console.error('error in createBadge:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }
}

module.exports = BadgeController;
