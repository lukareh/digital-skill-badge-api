# Digital Skill Badge & Certification API

a backend api for managing users and digital skill badges with postgresql database. supports full crud operations on users and badges with filtering capabilities.

**tech stack:** express.js, mvc architecture, postgresql

## setup

```bash
npm install
psql -U Server -d postgres -f sql/schema.sql
npm start
```

server runs on `http://localhost:3000`

## endpoints

**health:**
- `GET /health`

**users:**
- `GET /users` - all users
- `GET /users/:id` - by id
- `GET /users?role=learner` - by role
- `POST /users` - create
- `PUT /users/:id` - update
- `PATCH /users/:id` - partial update
- `DELETE /users/:id` - delete

**badges:**
- `GET /badges` - all badges
- `GET /badges?skill=ai` - by skill
- `POST /badges` - create
- `PUT /badges/:id` - update
- `PATCH /badges/:id` - partial update
- `DELETE /badges/:id` - delete

## testing

```bash
npm test
```

## postman

**import collection:**
1. open postman
2. click "import" button (top left)
3. select file: `postman/digital-skill-badge.postman_collection.json`
4. collection will appear in your workspace with all endpoints ready to test
