# Database Setup Instructions

## Prerequisites

- postgresql server installed and running on localhost
- user 'Server' with password 'harish'

## Create User (if not exists)

first create the postgres user if needed:

```bash
sudo -u postgres psql
```

then run:

```sql
CREATE USER "Server" WITH PASSWORD 'harish';
ALTER USER "Server" WITH SUPERUSER;
```

## Create Database and Tables

run the following command in your terminal:

```bash
psql -U Server -d postgres -f sql/schema.sql
```

or connect to postgres and run:

```bash
psql -U Server -d postgres
```

then execute:

```sql
\i sql/schema.sql
```

## Verify Setup

check if tables are created:

```bash
psql -U Server -d assignment-demo-project
```

```sql
\dt
SELECT * FROM users;
SELECT * FROM badges;
```

## Database Structure

### users table
- id (serial primary key, auto increment)
- name (varchar 255, required)
- email (varchar 255, required)
- role (varchar 50, default 'learner')
- created_at (timestamp, auto)

### badges table
- id (serial primary key, auto increment)
- title (varchar 255, required)
- skill (varchar 100, required)
- user_id (integer, foreign key to users.id)
- issued_at (timestamp, auto)

## Sample Data

the schema includes 2 sample users and 2 sample badges for testing.
