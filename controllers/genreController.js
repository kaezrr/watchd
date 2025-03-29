const db = require("../db/queries");

async function showGenres(req, res) {
  res.send(await db.getAllGenres());
}

async function searchGenres(req, res) {}

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
