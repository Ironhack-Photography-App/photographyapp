const express = require("express");
const router = express.Router();
// const { uploader, cloudinary } = require("../config/cloudinary");
const Photo = require("../models/Photo");
const User = require("../models/User");
// const { loginCheck } = require("./middlewares");

router.get("/dashboard", (req, res, next) => {
  // console.log("is this the user?>>", req.user);
  User.find()
    .populate('gallery')
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
  Photo.find({
      owner: req.user._id
    })
    .then((userPhotos) => {
      console.log(userPhotos);
      res.render("user/user-profile", {
        user: req.user,
        userPhotos: userPhotos
      });
    })
    .catch((err) => next(err));
});

router.get("/photographer/:id", (req, res, next) => {
  //console.log("is this the user?>>", req.params.id);
  User.findById(req.params.id)
    .populate('gallery')
    .then((photographer) => {
      console.log(photographer);
      res.render("user/photographer", {
        user: req.params.id,
        photographer: photographer,
      });
    })
    .catch((err) => next(err));
});



module.exports = router;