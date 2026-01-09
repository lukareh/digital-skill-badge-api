// in-memory user storage
let users = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    role: 'learner',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

let userIdCounter = 3;

class UserModel {
  // get all users
  static getAll() {
    return users;
  }

  // get user by id
  static getById(id) {
    return users.find(user => user.id === id);
  }

  // get users by role
  static getByRole(role) {
    return users.filter(user => user.role === role);
  }

  // create a new user
  static create(userData) {
    const newUser = {
      id: String(userIdCounter++),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'learner',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  }

  // clear all users (for testing purposes)
  static clearAll() {
    users = [];
    userIdCounter = 1;
  }

  // reset to initial state (for testing)
  static reset() {
    users = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@email.com',
        role: 'learner',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@email.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    userIdCounter = 3;
  }
}

module.exports = UserModel;
