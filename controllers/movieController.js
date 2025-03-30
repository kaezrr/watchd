const db = require("../db/queries");

async function showMovies(req, res) {
  const movies = await db.getAllMovies();
  res.render("index", { title: "Movies List", movies });
}

async function searchMoviesGet(req, res) {
  res.render("searchForm", { title: "Fuzzy find movies!" });
}

async function searchMoviesPost(req, res) {
  const { title, director, genre } = req.body;
  const movies = await db.searchMovie(title, director, genre);
  res.render("index", { title: "Search results", movies });
}

async function updateMovieGet(req, res) {
  const id = req.params.id;
  const movie = await db.getMovie(id);
  movie.genres = await db.getMovieGenres(id);
  const directors = await db.getAllDirectors();
  const genres = await db.getAllGenres();
  res.render("movieForm", {
    title: "Update movie",
    data: movie,
    directors,
    genres,
    url: `${id}/update`,
  });
}

async function updateMoviePost(req, res) {
  const id = req.params.id;
  const { name, year, rating, director, genre } = req.body;
  if (!genre) {
    const movie = await db.getMovie(id);
    movie.genres = await db.getMovieGenres(id);
    const directors = await db.getAllDirectors();
    const genres = await db.getAllGenres();
    res.render("movieForm", {
      title: "Update movie",
      data: movie,
      directors,
      genres,
      url: `${id}/update`,
      errors: "Must select atleast 1 genre!",
    });
    return;
  }

  try {
    await db.updateMovie(id, name, year, rating, director);
    await db.updateMovieGenres(id, genre);
    res.redirect("/");
  } catch {
    const movie = await db.getMovie(id);
    movie.genres = await db.getMovieGenres(id);
    const directors = await db.getAllDirectors();
    const genres = await db.getAllGenres();
    res.render("movieForm", {
      title: "Update movie",
      data: movie,
      directors,
      genres,
      url: `${id}/update`,
      errors: "Movie already exists!",
    });
  }
}

async function deleteMovie(req, res) {
  await db.deleteMovie(req.params.id);
  res.redirect("/");
}

async function createMovieGet(req, res) {
  const directors = await db.getAllDirectors();
  const genres = await db.getAllGenres();
  res.render("movieForm", {
    title: "Add a new movie!",
    directors,
    genres,
    url: "create",
  });
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
      url: "create",
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
      url: "create",
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
