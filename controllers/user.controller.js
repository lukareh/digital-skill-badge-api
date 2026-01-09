const UserModel = require('../models/user.model');

class UserController {
  // get all users or filter by role
  static async getUsers(req, res) {
    try {
      const { role } = req.query;

      if (role) {
        const users = await UserModel.getByRole(role);
        return res.status(200).json(users);
      }

      const users = await UserModel.getAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('error in getUsers:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // get user by id
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id);

      if (!user) {
        return res.status(400).json({ error: 'user not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('error in getUserById:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }

  // create a new user
  static async createUser(req, res) {
    try {
      const { name, email, role } = req.body;

      // validation
      if (!name || !email) {
        return res.status(400).json({ 
          error: 'missing required fields',
          required: ['name', 'email']
        });
      }

      const newUser = await UserModel.create({ name, email, role });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('error in createUser:', error);
      return res.status(500).json({ error: 'internal server error' });
    }
  }
}

module.exports = UserController;
