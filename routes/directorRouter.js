const { Router } = require("express");
const directorController = require("../controllers/directorController");

const directorRouter = Router();

directorRouter.get("/create", directorController.createDirectorGet);
directorRouter.post("/create", directorController.createDirectorPost);

directorRouter.get("/", directorController.showDirectors);
directorRouter.get("/:id", directorController.searchDirectors);

directorRouter.get("/:id/update", directorController.updateDirectorGet);
directorRouter.post("/:id/update", directorController.updateDirectorPost);

directorRouter.get("/:id/delete", directorController.deleteDirector);

module.exports = directorRouter;
