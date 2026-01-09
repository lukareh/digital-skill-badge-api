const { pool } = require('../config/database');

class UserModel {
  // get all users
  static async getAll() {
    const result = await pool.query('SELECT id, name, email, role, created_at as "createdAt" FROM users');
    return result.rows;
  }

  // get user by id
  static async getById(id) {
    const result = await pool.query('SELECT id, name, email, role, created_at as "createdAt" FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  // get users by role
  static async getByRole(role) {
    const result = await pool.query('SELECT id, name, email, role, created_at as "createdAt" FROM users WHERE role = $1', [role]);
    return result.rows;
  }

  // create a new user
  static async create(userData) {
    const { name, email, role } = userData;
    const result = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at as "createdAt"',
      [name, email, role || 'learner']
    );
    
    return result.rows[0];
  }

  // update user (put - full update)
  static async update(id, userData) {
    const { name, email, role } = userData;
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role, created_at as "createdAt"',
      [name, email, role || 'learner', id]
    );
    
    return result.rows[0];
  }

  // partial update user (patch)
  static async partialUpdate(id, userData) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (userData.name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(userData.name);
      paramCount++;
    }
    if (userData.email !== undefined) {
      updates.push(`email = $${paramCount}`);
      values.push(userData.email);
      paramCount++;
    }
    if (userData.role !== undefined) {
      updates.push(`role = $${paramCount}`);
      values.push(userData.role);
      paramCount++;
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, name, email, role, created_at as "createdAt"`;
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  // delete user
  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    
    return result.rows[0];
  }

  // clear all users (for testing purposes)
  static async clearAll() {
    await pool.query('DELETE FROM users');
    await pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  }

  // reset to initial state (for testing)
  static async reset() {
    await pool.query('DELETE FROM users');
    await pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3), ($4, $5, $6)',
      ['Rajesh Kumar', 'rajesh@email.com', 'learner', 'Priya Sharma', 'priya@email.com', 'admin']
    );
  }
}

module.exports = UserModel;
