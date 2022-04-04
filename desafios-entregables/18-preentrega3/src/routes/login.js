const express = require("express");
const passport = require("passport");
const { Router } = express;
const login = Router();

login.post("/login", passport.authenticate("login", { failureRedirect: "/api/errorlogin"}), (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/api/productos");
})
.get("/errorlogin", (req, res) => {
  res.json({message: req.flash('message')});
});

module.exports = login;