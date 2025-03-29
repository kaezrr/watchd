const { Router } = require("express");
const movieController = require("../controllers/movieController");

const movieRouter = Router();

movieRouter.get("/create", movieController.createMoviePost);
movieRouter.post("/create", movieController.createMovieGet);

movieRouter.get("/", movieController.showMovies);
movieRouter.get("/search", movieController.searchMovies);

movieRouter.get("/:id/update", movieController.updateMovieGet);
movieRouter.post("/:id/update", movieController.updateMoviePost);

movieRouter.post("/:id/delete", movieController.deleteMovie);

module.exports = movieRouter;
