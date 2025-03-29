const { Router } = require("express");
const movieController = require("../controllers/movieController");

const movieRouter = Router();

movieRouter.get("/", movieController.showAllMovies);
movieRouter.get("/categories", movieController.showCategories);
movieRouter.get("/directors", movieController.showDirectors);

movieRouter.get("/search", movieController.searchMovieGet);
movieRouter.post("/delete", movieController.deleteMoviePost);

movieRouter.get("/create", movieController.createMoviePost);
movieRouter.post("/create", movieController.createMovieGet);

movieRouter.get("/update", movieController.updateMovieGet);
movieRouter.post("/update", movieController.updateMoviePost);

module.exports = movieRouter;
