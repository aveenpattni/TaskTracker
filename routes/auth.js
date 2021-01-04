const express = require("express");
const isAuthenticated = require('../middleware/token');
const router = express.Router();

const db = require('../models');
const Users = db.Users;

//Checks if any request made to this route has an authenticated token
router.use(isAuthenticated);

router.get("/", (req, res) => {
  const { username } = req.user.user;
  Users.findOne({
    where: { username }
  })
  .then(foundUser => {
    res.json(foundUser);
  })
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json(err);
  });
});

module.exports = router;