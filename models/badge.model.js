const { pool } = require('../config/database');

class BadgeModel {
  // get all badges
  static async getAll() {
    const result = await pool.query('SELECT id, title, skill, user_id as "userId", issued_at as "issuedAt" FROM badges');
    return result.rows;
  }

  // get badges by skill
  static async getBySkill(skill) {
    const result = await pool.query('SELECT id, title, skill, user_id as "userId", issued_at as "issuedAt" FROM badges WHERE skill = $1', [skill]);
    return result.rows;
  }

  // get badges by user id
  static async getByUserId(userId) {
    const result = await pool.query('SELECT id, title, skill, user_id as "userId", issued_at as "issuedAt" FROM badges WHERE user_id = $1', [userId]);
    return result.rows;
  }

  // create a new badge
  static async create(badgeData) {
    const { title, skill, userId } = badgeData;
    const result = await pool.query(
      'INSERT INTO badges (title, skill, user_id) VALUES ($1, $2, $3) RETURNING id, title, skill, user_id as "userId", issued_at as "issuedAt"',
      [title, skill, userId]
    );
    
    return result.rows[0];
  }

  // update badge (put - full update)
  static async update(id, badgeData) {
    const { title, skill, userId } = badgeData;
    const result = await pool.query(
      'UPDATE badges SET title = $1, skill = $2, user_id = $3 WHERE id = $4 RETURNING id, title, skill, user_id as "userId", issued_at as "issuedAt"',
      [title, skill, userId, id]
    );
    
    return result.rows[0];
  }

  // partial update badge (patch)
  static async partialUpdate(id, badgeData) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (badgeData.title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(badgeData.title);
      paramCount++;
    }
    if (badgeData.skill !== undefined) {
      updates.push(`skill = $${paramCount}`);
      values.push(badgeData.skill);
      paramCount++;
    }
    if (badgeData.userId !== undefined) {
      updates.push(`user_id = $${paramCount}`);
      values.push(badgeData.userId);
      paramCount++;
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);
    const query = `UPDATE badges SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, title, skill, user_id as "userId", issued_at as "issuedAt"`;
    const result = await pool.query(query, values);
    
    return result.rows[0];
  }

  // delete badge
  static async delete(id) {
    const result = await pool.query(
      'DELETE FROM badges WHERE id = $1 RETURNING id',
      [id]
    );
    
    return result.rows[0];
  }

  // clear all badges (for testing purposes)
  static async clearAll() {
    await pool.query('DELETE FROM badges');
    await pool.query('ALTER SEQUENCE badges_id_seq RESTART WITH 1');
  }

  // reset to initial state (for testing)
  static async reset() {
    await pool.query('DELETE FROM badges');
    await pool.query('ALTER SEQUENCE badges_id_seq RESTART WITH 1');
    await pool.query(
      'INSERT INTO badges (title, skill, user_id) VALUES ($1, $2, $3), ($4, $5, $6)',
      ['AI Fundamentals', 'ai', 1, 'Backend Developer', 'nodejs', 1]
    );
  }
}

module.exports = BadgeModel;
