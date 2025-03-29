const express = require("express");

const App = express();
App.set("view engine", "ejs");
App.use(express.static("public"));
App.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
