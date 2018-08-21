CREATE schema IF NOT EXISTS decision;
set schema 'decision';
-- CREATE TABLE groups (
--   id SERIAL PRIMARY KEY,
--   name varchar(50) UNIQUE
-- );
CREATE TABLE IF NOT EXISTS items(
  name VARCHAR(25),
  id SERIAL PRIMARY KEY,
  parent integer null references items(id)
--   group_id integer references groups(id)
);
