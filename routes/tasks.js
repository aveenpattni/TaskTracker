const express = require("express");
const isAuthenticated = require('../middleware/token');
const router = express.Router();

const db = require('../models');
const Tasks = db.Tasks;

//Checks if any request made to this route has an authenticated token
router.use(isAuthenticated);

router.get("/", (req, res) => {
  const uID = req.user.user.id;
  Tasks.findAll({
    where: {uID}
  })
  .then(tasks => {
    res.status(200).json(tasks)
  })
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json(err);
  })
});

module.exports = router;
