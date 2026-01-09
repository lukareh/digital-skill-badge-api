-- create database
CREATE DATABASE "assignment-demo-project";

-- connect to database
\c "assignment-demo-project";

-- users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'learner',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);

-- badges table
CREATE TABLE IF NOT EXISTS badges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  skill VARCHAR(100) NOT NULL,
  user_id INTEGER NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_badges_skill ON badges(skill);
CREATE INDEX idx_badges_user_id ON badges(user_id);

-- insert sample data
INSERT INTO users (name, email, role) VALUES
('Rajesh Kumar', 'rajesh@email.com', 'learner'),
('Priya Sharma', 'priya@email.com', 'admin');

INSERT INTO badges (title, skill, user_id) VALUES
('AI Fundamentals', 'ai', 1),
('Backend Developer', 'nodejs', 1);
