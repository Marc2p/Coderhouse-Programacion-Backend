const express = require("express");
const loginController = require("../controllers/login");
const { Router } = express;
const login = Router();
login.post("/login", passport.authenticate('login', { failureRedirect: '/api/errorlogin'}), loginController);
module.exports = login;