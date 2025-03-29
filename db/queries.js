const db = require("./pool");

async function getAllMovies() {
  const { rows } = await db.query(
    `SELECT m.id, 
     m.title,
     m.release_year,
     m.rating,
     d.name AS director,
     STRING_AGG(g.name, ', ') AS genres
     FROM movies m 
     JOIN directors d ON m.director_id=d.id
     JOIN movies_genres mg ON mg.movie_id=m.id
     JOIN genres g ON g.id=mg.genre_id
     GROUP BY m.id, m.title, m.release_year, m.rating, d.name
     ORDER BY m.id;`,
  );
  return rows;
}

async function deleteMovie(id) {
  await db.query(`DELETE FROM movies WHERE id=$1`, [id]);
}

async function deleteDirector(id) {
  await db.query(`DELETE FROM directors WHERE id=$1`, [id]);
}

async function deleteGenre(id) {
  await db.query(`DELETE FROM genres WHERE id=$1`, [id]);
}

async function insertDirector(name, birthyear, nationality) {
  await db.query(
    `INSERT INTO directors(name, birth_year, nationality) VALUES ($1, $2, $3)`,
    [name, birthyear, nationality],
  );
}

async function insertGenre(name) {
  await db.query(`INSERT INTO genres(name) VALUES ($1)`, [name]);
}

async function insertMovie(title, release, rating, director_id) {
  await db.query(
    `INSERT INTO movies (title, release_year, rating, director_id) VALUES ($1, $2, $3, $4)`,
    [title, release, rating, director_id],
  );
}

async function searchMovie(title, director, genre) {
  const titlePattern = title ? `%${title}%` : `%`;
  const directorPattern = director ? `%${director}%` : `%`;
  const genrePattern = genre ? `%${genre}%` : `%`;

  const { rows } = await db.query(
    `SELECT m.id, 
     m.title,
     m.release_year,
     m.rating,
     d.name AS director,
     STRING_AGG(g.name, ', ') AS genres
     FROM movies m 
     JOIN directors d ON m.director_id=d.id
     JOIN movies_genres mg ON mg.movie_id=m.id
     JOIN genres g ON g.id=mg.genre_id
     WHERE m.title ILIKE $1
     AND d.name ILIKE $2
     AND g.name ILIKE $3
     GROUP BY m.id, m.title, m.release_year, m.rating, d.name
     ORDER BY m.id;`,
    [titlePattern, directorPattern, genrePattern],
  );
  return rows;
}

async function searchGenres(id) {
  const { rows } = await db.query(
    `SELECT m.id, m.title, m.release_year, m.rating FROM movies m
     JOIN movies_genres mg ON mg.movie_id = m.id
     JOIN genres g ON g.id = mg.genre_id
     WHERE g.id = $1;`,
    [id],
  );
  return rows;
}

async function searchDirectors(id) {
  const { rows } = await db.query(
    `SELECT m.id, m.title, m.release_year, m.rating FROM movies m
     JOIN directors d ON m.director_id = d.id
     WHERE d.id = $1;`,
    [id],
  );
  return rows;
}

async function getAllGenres() {
  const { rows } = await db.query(`SELECT * FROM genres`);
  return rows;
}

async function getAllDirectors() {
  const { rows } = await db.query(`SELECT * FROM directors`);
  return rows;
}

module.exports = {
  insertGenre,
  insertDirector,
  insertMovie,

  searchMovie,
  searchGenres,
  searchDirectors,

  deleteGenre,
  deleteMovie,
  deleteDirector,

  getAllMovies,
  getAllGenres,
  getAllDirectors,
};
