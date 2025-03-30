require("dotenv").config();
const { Router } = require("express");

const { ADMINPASS } = process.env;
const authRouter = Router();

authRouter.get("/", (req, res) => {
  const { base, action, id } = req.query;
  res.render("securityForm", { base, action, id });
});

authRouter.post("/", (req, res) => {
  const { pass } = req.body;
  const { base, action, id } = req.query;
  if (pass === ADMINPASS) {
    res.redirect(`${base}/${id}/${action}`);
    return;
  }
  res.render("securityForm", {
    base,
    action,
    id,
    errors: "Wrong password!",
  });
});

module.exports = authRouter;
