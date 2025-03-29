const db = require("../db/queries");

async function showGenres(req, res) {
  const genres = await db.getAllGenres();
  res.render("genre", { title: "Genres List", genres });
}

async function searchGenres(req, res) {
  const movies = await db.searchGenres(req.params.id);
  res.render("index", { title: "Movies by Genre", movies });
}

async function updateGenreGet(req, res) {}

async function updateGenrePost(req, res) {}

async function deleteGenre(req, res) {}

async function createGenreGet(req, res) {}

async function createGenrePost(req, res) {}

module.exports = {
  createGenrePost,
  createGenreGet,

  showGenres,
  searchGenres,

  updateGenreGet,
  updateGenrePost,

  deleteGenre,
};
