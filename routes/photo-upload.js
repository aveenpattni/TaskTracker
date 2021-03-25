const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("🔥");
  res.status(200).json({res: "ok"});
});

module.exports = router;
