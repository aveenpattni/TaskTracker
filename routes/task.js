const express = require("express");
const isAuthenticated = require('../middleware/token');
const router = express.Router();
const {v4: uuidv4} = require("uuid");

const db = require('../models');
const Tasks = db.Tasks;

//Checks if any request made to this route has an authenticated token
router.use(isAuthenticated);

router.post("/add", (req, res) => {
  const {uID, title, description, priority, due} = req.body;
  const id = uuidv4();
  Tasks.create({
    id,
    uID,
    title,
    description,
    priority,
    due,
    status: 0
  })
  .then(task => res.status(200).json({status: "success", task}))
  .catch(err => {
    console.log("🔥", err);
    res.status(500).json({status: "failure"})
  });
});

router.put("/update", (req, res) => {
  const {title, description, priority, due, id, status} = req.body;

  Tasks.update({title, description, priority, due, status}, {
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
  console.log("💧", req);
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
