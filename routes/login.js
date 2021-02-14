const express = require("express");
const bcrypt = require('bcrypt');
const R = require("ramda");
const Token = require('../config/token');
const router = express.Router();

const db = require('../models');
const Users = db.Users;

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!req.body || !username || !password) {
    res.status(400).json({
      message: `You need to have a username and password in your login.`
    });
  }

  const foundUser = await Users.findOne({
    where: { username }
  });

  if (!foundUser) {
    res.status(401).json({
      status: "failure",
      message: `This username/password is invalid.`
    });
  }
  const match = await bcrypt.compare(password, foundUser.password) || password === foundUser.password;
  if (!match){
    res.status(401).json({
      message: `This username/password is invalid.`
    });
  }

  res.status(202).json({
    user: foundUser,
    token: Token.create(foundUser, "10h")
  });
});

module.exports = router;