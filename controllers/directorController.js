const db = require("../db/queries");

async function showDirectors(req, res) {
  const directors = await db.getAllDirectors();
  res.render("director", { title: "Directors List", directors });
}

async function searchDirectors(req, res) {
  const movies = await db.searchDirectors(req.params.id);
  res.render("index", { title: "Movies by Director", movies });
}

async function updateDirectorGet(req, res) {}

async function updateDirectorPost(req, res) {}

async function deleteDirector(req, res) {
  await db.deleteDirector(req.params.id);
  res.redirect("/directors");
}

async function createDirectorGet(req, res) {
  res.render("directorForm", { title: "Add a new director" });
}

async function createDirectorPost(req, res) {
  const { name, birth, nation } = req.body;
  await db.insertDirector(name, birth, nation);
  res.redirect("/directors");
}

module.exports = {
  createDirectorPost,
  createDirectorGet,

  showDirectors,
  searchDirectors,

  updateDirectorGet,
  updateDirectorPost,

  deleteDirector,
};
