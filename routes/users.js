const express = require("express");
const router = express.Router();
// const { uploader, cloudinary } = require("../config/cloudinary");
const Photo = require("../models/Photo");
const User = require("../models/User");
// const { loginCheck } = require("./middlewares");

router.get("/dashboard", (req, res, next) => {
  // console.log("is this the user?>>", req.user);
  User.find()
    .then((photographers) => {
      // let user = req.user.username;
      res.render("dashboard", {
        user: req.user,
        photographers: photographers,
      });
      // console.log(photographers, " photographers");
    })
    .catch((err) => console.log(err));
});

router.get("/user-profile", (req, res, next) => {
  Photo.find({ owner: req.user._id })
    .then((userPhotos) => {
      console.log(userPhotos);
      res.render("user/user-profile", { userPhotos: userPhotos });
    })
    .catch((err) => next(err));
});

module.exports = router;
