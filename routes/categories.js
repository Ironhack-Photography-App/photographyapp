const express = require("express");
const router = express.Router();
// const { uploader, cloudinary } = require("../config/cloudinary");
const Photo = require("../models/Photo");
const User = require("../models/User");

router.post("/categories", (req, res, next) => {
  const { category } = req.body;
  console.log(category);

  User.find({ category: category })
    .populate("gallery")
    .then((photographers) => {
      // console.log(
      //   "this is the photographers'photos",
      //   photographers[0].gallery.imgPath
      // );

      res.render("photo/categories", {
        photographers: photographers,
        // user: req.params.id,
        user: req.user,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
