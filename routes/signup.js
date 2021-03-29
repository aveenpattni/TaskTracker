const express = require("express");
const router = express.Router();
const Token = require('../config/token');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../models');
const Users = db.Users;

router.post("/", async (req, res) => {
  const user = req.body;
  const hashedPassword =  await bcrypt.hash(user.password, saltRounds);
  
  Users.create({
    username: user.username,
    email: user.email,
    password: hashedPassword,
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl || "",
    isAdmin: false
  })
  .then(user => res.status(200).json({
    signup: "Success",
    user,
    token: Token.create(user, "10h")
  }))
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json(err);
  })
});

module.exports = router;
