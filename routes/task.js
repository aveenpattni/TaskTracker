const express = require("express");
const isAuthenticated = require('../middleware/token');
const router = express.Router();

const db = require('../models');
const Tasks = db.Tasks;

//Checks if any request made to this route has an authenticated token
router.use(isAuthenticated);

router.post("/add", (req, res) => {
  const {uID, title, description, priority, due} = req.body;

  Tasks.create({
    uID,
    title,
    description,
    priority,
    due
  })
  .then(task => res.status(200).json({status: "success"}))
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json({status: "failure"})
  });
});

router.put("/update", (req, res) => {
  const {uID, title, description, priority, due, id} = req.body;

  Tasks.update({title, description, priority, due}, {
    where: {
      id
    }
  })
  .then(task => res.status(200).json({status: "success"}))
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json({status: "failure"})
  });
});

router.delete("/remove", (req, res) => {
  Tasks.destroy({
    where: { id: req.query.id}
  })
  .then(() => res.json({status: "success"}))
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json({status: "failure"});
  });
});


module.exports = router;
