const express = require("express");
const router = express.Router();
const { uploader, cloudinary } = require("../config/cloudinary");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
