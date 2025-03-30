const db = require("../db/queries");

async function showMovies(req, res) {
  const movies = await db.getAllMovies();
  res.render("index", { title: "Movies List", movies });
}

async function searchMoviesGet(req, res) {
  res.render("searchForm", { title: "Fuzzy search movies!" });
}

async function searchMoviesPost(req, res) {
  const { title, director, genre } = req.body;
  const movies = await db.searchMovie(title, director, genre);
  res.render("index", { title: "Search results", movies });
}

async function updateMovieGet(req, res) {}

async function updateMoviePost(req, res) {}

async function deleteMovie(req, res) {
  await db.deleteMovie(req.params.id);
  res.redirect("/");
}

async function createMovieGet(req, res) {
  const directors = await db.getAllDirectors();
  const genres = await db.getAllGenres();
  res.render("movieForm", { title: "Add a new movie!", directors, genres });
}

async function createMoviePost(req, res) {
  const { name, year, rating, director, genre } = req.body;
  if (!genre) {
    const directors = await db.getAllDirectors();
    const genres = await db.getAllGenres();
    res.render("movieForm", {
      title: "Add a new movie!",
      directors,
      genres,
      errors: "Must select atleast 1 genre",
    });
    return;
  }

  try {
    await db.insertMovie(name, year, rating, director);
    await db.insertMovieGenre(name, genre);
    res.redirect("/");
  } catch {
    const directors = await db.getAllDirectors();
    const genres = await db.getAllGenres();
    res.render("movieForm", {
      title: "Add a new movie!",
      directors,
      genres,
      errors: "Movie already exists!",
    });
  }
}

module.exports = {
  createMoviePost,
  createMovieGet,

  showMovies,
  searchMoviesGet,
  searchMoviesPost,

  updateMovieGet,
  updateMoviePost,

  deleteMovie,
};
