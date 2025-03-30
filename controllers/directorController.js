const db = require("../db/queries");

async function showDirectors(req, res) {
  const directors = await db.getAllDirectors();
  res.render("director", { title: "Directors List", directors });
}

async function searchDirectors(req, res) {
  const movies = await db.searchDirectors(req.params.id);
  res.render("index", { title: "Movies by Director", movies });
}

async function updateDirectorGet(req, res) {
  const id = req.params.id;
  const director = await db.getDirector(id);
  res.render("directorForm", {
    title: "Update director",
    data: director,
    url: `${id}/update`,
  });
}

async function updateDirectorPost(req, res) {
  const id = req.params.id;
  const { name, birth, nation } = req.body;
  try {
    await db.updateDirector(id, name, birth, nation);
    res.redirect("/directors");
  } catch {
    const director = await db.getDirector(id);
    res.render("directorForm", {
      title: "Update director",
      data: director,
      url: `${id}/update`,
      errors: "Director already exists!",
    });
  }
}

async function deleteDirector(req, res) {
  await db.deleteDirector(req.params.id);
  res.redirect("/directors");
}

async function createDirectorGet(req, res) {
  res.render("directorForm", { title: "Add a new director", url: "create" });
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
