const db = require("../db/queries");

async function showMovies(req, res) {
  res.send(await db.getAllMovies());
}

async function searchMovies(req, res) {}

async function updateMovieGet(req, res) {}

async function updateMoviePost(req, res) {}

async function deleteMovie(req, res) {}

async function createMovieGet(req, res) {}

async function createMoviePost(req, res) {}

module.exports = {
  createMoviePost,
  createMovieGet,

  showMovies,
  searchMovies,

  updateMovieGet,
  updateMoviePost,

  deleteMovie,
};
