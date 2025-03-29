const db = require("../db/queries");

async function showDirectors(req, res) {
  res.send(await db.getAllDirectors());
}

async function searchDirectors(req, res) {}

async function updateDirectorGet(req, res) {}

async function updateDirectorPost(req, res) {}

async function deleteDirector(req, res) {}

async function createDirectorGet(req, res) {}

async function createDirectorPost(req, res) {}

module.exports = {
  createDirectorPost,
  createDirectorGet,

  showDirectors,
  searchDirectors,

  updateDirectorGet,
  updateDirectorPost,

  deleteDirector,
};
