const { Router } = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();

genreRouter.get("/create", genreController.createGenreGet);
genreRouter.post("/create", genreController.createGenrePost);

genreRouter.get("/", genreController.showGenres);
genreRouter.get("/:id", genreController.searchGenres);

genreRouter.get("/:id/update", genreController.updateGenreGet);
genreRouter.post("/:id/update", genreController.updateGenrePost);

genreRouter.post("/:id/delete", genreController.deleteGenre);

module.exports = genreRouter;
