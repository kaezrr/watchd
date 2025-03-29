const express = require("express");
const movieRouter = require("./routes/movieRouter");

const App = express();
App.set("view engine", "ejs");
App.use(express.static("public"));
App.use(express.urlencoded({ extended: true }));

App.use("/", movieRouter);

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
