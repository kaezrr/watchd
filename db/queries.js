const db = require("./pool");

async function updateGenre(id, name) {
  await db.query(`UPDATE genres SET name=$1 WHERE id=$2`, [name, id]);
}

async function updateDirector(id, name, birth, nation) {
  await db.query(
    `UPDATE directors 
     SET name=$1, birth_year=$2, nationality=$3
     WHERE id=$4`,
    [name, birth, nation, id],
  );
}

async function updateMovie(id, name, year, rating, director) {
  await db.query(
    `UPDATE movies 
     SET title=$1, release_year=$2, rating=$3, director_id=$4
     WHERE id=$5`,
    [name, year, rating, director, id],
  );
}

async function updateMovieGenres(id, genre) {
  if (typeof genre === "string") genre = [genre];
  await db.query(`DELETE FROM movies_genres WHERE movie_id = $1`, [id]);
  for (let g of genre) {
    await db.query(
      `INSERT INTO movies_genres (movie_id, genre_id) VALUES ($1, $2);`,
      [id, g],
    );
  }
}

async function getMovie(id) {
  const { rows } = await db.query(`SELECT * FROM movies WHERE id=$1`, [id]);
  return rows[0];
}

async function getDirector(id) {
  const { rows } = await db.query(`SELECT * FROM directors WHERE id=$1`, [id]);
  return rows[0];
}

async function getGenre(id) {
  const { rows } = await db.query(`SELECT * FROM genres WHERE id=$1`, [id]);
  return rows[0];
}

async function getMovieGenres(id) {
  const { rows } = await db.query(
    `SELECT genre_id FROM movies_genres WHERE movie_id=$1`,
    [id],
  );
  return rows.map((row) => row.genre_id);
}

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

async function insertMovieGenre(name, genre) {
  if (typeof genre === "string") genre = [genre];
  for (let g of genre) {
    await db.query(
      `INSERT INTO movies_genres (movie_id, genre_id) 
       VALUES (
       (SELECT id FROM movies WHERE title = $1),
       $2
       );`,
      [name, g],
    );
  }
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
     WHERE g.id = $1
     GROUP BY m.id, m.title, m.release_year, m.rating, d.name
     ORDER BY m.id;`,
    [id],
  );
  return rows;
}

async function searchDirectors(id) {
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
     WHERE d.id = $1
     GROUP BY m.id, m.title, m.release_year, m.rating, d.name
     ORDER BY m.id;`,
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
  insertMovieGenre,

  searchMovie,
  searchGenres,
  searchDirectors,

  deleteGenre,
  deleteMovie,
  deleteDirector,

  getAllMovies,
  getAllGenres,
  getAllDirectors,

  getMovie,
  getGenre,
  getDirector,
  getMovieGenres,

  updateGenre,
  updateDirector,
  updateMovie,
  updateMovieGenres,
};
