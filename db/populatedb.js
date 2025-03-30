#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS directors(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  birth_year INTEGER,
  nationality VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS genres(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS movies(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) UNIQUE NOT NULL,
  release_year INTEGER NOT NULL,
  rating FLOAT NOT NULL,
  director_id INTEGER REFERENCES directors (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movies_genres(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  movie_id INTEGER REFERENCES movies (id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE
); 

INSERT INTO directors (name, birth_year, nationality) VALUES
('Christopher Nolan', 1970, 'British'),
('Quentin Tarantino', 1963, 'American'),
('Steven Spielberg', 1946, 'American'),
('Martin Scorsese', 1942, 'American'),
('James Cameron', 1954, 'Canadian');

INSERT INTO genres (name) VALUES
('Sci-Fi'),
('Action'),
('Drama'),
('Thriller'),
('Adventure'),
('Crime');

INSERT INTO movies (title, release_year, rating, director_id) VALUES
('Inception', 2010, 8.8, 1),
('Interstellar', 2014, 8.6, 1),
('The Dark Knight', 2008, 9.0, 1),
('Pulp Fiction', 1994, 8.9, 2),
('Django Unchained', 2012, 8.4, 2),
('Jurassic Park', 1993, 8.1, 3),
('Schindler''s List', 1993, 9.0, 3),
('The Irishman', 2019, 7.9, 4),
('Titanic', 1997, 7.8, 5),
('Avatar', 2009, 7.8, 5);

INSERT INTO movies_genres (movie_id, genre_id) VALUES
(1, 1),  -- Inception -> Sci-Fi
(1, 4),  -- Inception -> Thriller
(2, 1),  -- Interstellar -> Sci-Fi
(2, 3),  -- Interstellar -> Drama
(3, 2),  -- The Dark Knight -> Action
(3, 4),  -- The Dark Knight -> Thriller
(4, 6),  -- Pulp Fiction -> Crime
(5, 2),  -- Django Unchained -> Action
(5, 6),  -- Django Unchained -> Crime
(6, 5),  -- Jurassic Park -> Adventure
(7, 3),  -- Schindler's List -> Drama
(8, 3),  -- The Irishman -> Drama
(8, 6),  -- The Irishman -> Crime
(9, 3),  -- Titanic -> Drama
(10, 1), -- Avatar -> Sci-Fi
(10, 5); -- Avatar -> Adventure
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
