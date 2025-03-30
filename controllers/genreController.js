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

async function deleteGenre(req, res) {
  await db.deleteGenre(req.params.id);
  res.redirect("/genres");
}

async function createGenreGet(req, res) {
  res.render("genreForm", { title: "Add a new genre" });
}

async function createGenrePost(req, res) {
  const { name } = req.body;
  try {
    await db.insertGenre(name);
    res.redirect("/genres");
  } catch {
    res.render("genreForm", {
      title: "Add a new genre",
      errors: "Genre name already exists!",
    });
  }
}

module.exports = {
  createGenrePost,
  createGenreGet,

  showGenres,
  searchGenres,

  updateGenreGet,
  updateGenrePost,

  deleteGenre,
};
