// in-memory badge storage
let badges = [
  {
    id: '1',
    title: 'AI Fundamentals',
    skill: 'ai',
    userId: '1',
    issuedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Backend Developer',
    skill: 'nodejs',
    userId: '1',
    issuedAt: new Date().toISOString()
  }
];

let badgeIdCounter = 3;

class BadgeModel {
  // get all badges
  static getAll() {
    return badges;
  }

  // get badges by skill
  static getBySkill(skill) {
    return badges.filter(badge => badge.skill === skill);
  }

  // get badges by user id
  static getByUserId(userId) {
    return badges.filter(badge => badge.userId === userId);
  }

  // create a new badge
  static create(badgeData) {
    const newBadge = {
      id: String(badgeIdCounter++),
      title: badgeData.title,
      skill: badgeData.skill,
      userId: badgeData.userId,
      issuedAt: new Date().toISOString()
    };
    badges.push(newBadge);
    return newBadge;
  }

  // clear all badges (for testing purposes)
  static clearAll() {
    badges = [];
    badgeIdCounter = 1;
  }

  // reset to initial state (for testing)
  static reset() {
    badges = [
      {
        id: '1',
        title: 'AI Fundamentals',
        skill: 'ai',
        userId: '1',
        issuedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Backend Developer',
        skill: 'nodejs',
        userId: '1',
        issuedAt: new Date().toISOString()
      }
    ];
    badgeIdCounter = 3;
  }
}

module.exports = BadgeModel;
