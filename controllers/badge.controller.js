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

  // update badge (put - full update)
  static async updateBadge(req, res) {
    try {
      const { id } = req.params;
      const { title, skill, userId } = req.body;

      // validation
      if (!title || !skill || !userId) {
        return res.status(400).json({ 
          error: 'missing required fields',
          required: ['title', 'skill', 'userId']
        });
      }

      const updatedBadge = await BadgeModel.update(id, { title, skill, userId });
      
      if (!updatedBadge) {
        return res.status(404).json({ error: 'badge not found' });
      }

      return res.status(200).json(updatedBadge);
    } catch (error) {
      console.error('error in updateBadge:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // partial update badge (patch)
  static async patchBadge(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'no fields to update' });
      }

      const updatedBadge = await BadgeModel.partialUpdate(id, updates);
      
      if (!updatedBadge) {
        return res.status(404).json({ error: 'badge not found' });
      }

      return res.status(200).json(updatedBadge);
    } catch (error) {
      console.error('error in patchBadge:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // delete badge
  static async deleteBadge(req, res) {
    try {
      const { id } = req.params;
      const deletedBadge = await BadgeModel.delete(id);
      
      if (!deletedBadge) {
        return res.status(404).json({ error: 'badge not found' });
      }

      return res.status(200).json({ message: 'badge deleted successfully', id: deletedBadge.id });
    } catch (error) {
      console.error('error in deleteBadge:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }
}

module.exports = BadgeController;
