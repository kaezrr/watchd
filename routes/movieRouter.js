const { Router } = require("express");
const movieController = require("../controllers/movieController");

const movieRouter = Router();

movieRouter.get("/create", movieController.createMovieGet);
movieRouter.post("/create", movieController.createMoviePost);

movieRouter.get("/", movieController.showMovies);
movieRouter.get("/search", movieController.searchMoviesGet);
movieRouter.post("/search", movieController.searchMoviesPost);

movieRouter.get("/:id/update", movieController.updateMovieGet);
movieRouter.post("/:id/update", movieController.updateMoviePost);

movieRouter.get("/:id/delete", movieController.deleteMovie);

module.exports = movieRouter;
