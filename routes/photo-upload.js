const aws = require("aws-sdk");
const config = require("../config/aws");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS,
  region: config.REGION
});
const storage = multer.memoryStorage({
  destination: function(req, file, cb) {
    cb(null, "");
  }
})
const photoUpload = multer({storage}).single("image");

router.post("/", photoUpload, async (req, res) => {
  const user = "profile"
  const fileName = req.file.originalname.split(".");
  const fileType = fileName[fileName.length-1];
  const params = {
    Bucket: config.DB,
    Key: `${user}_${Date.now().toString()}.${fileType}`,
    Body: req.file.buffer,
    ACL: "public-read",
  };
  s3.upload(params, (err, data) => {
    if(data) {
      return res.json({"imageUrl": data.Location});
    } else if (err) {
      return res.status(422).send({errors: [{title: "File Upload Error", detail: err.message}]});
    } else {
      return res.status(422).send({errors: [{title: "File Upload Error", detail: "Unknown"}]});
    }
  });
});

module.exports = router;
