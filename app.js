const express = require("express");
const path = require("node:path");
const movieRouter = require("./routes/movieRouter");
const genreRouter = require("./routes/genreRouter");
const directorRouter = require("./routes/directorRouter");

const App = express();
App.set("view engine", "ejs");
App.use(express.static(path.join(__dirname, "public")));
App.use(express.urlencoded({ extended: true }));

App.use("/", movieRouter);
App.use("/genres", genreRouter);
App.use("/directors", directorRouter);

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
