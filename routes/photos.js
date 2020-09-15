const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const { loginCheck } = require("./middlewares");
const { uploader, cloudinary } = require("../config/cloudinary");

router.get("/photo", (req, res, next) => {
  Photo.find()
    .then((photos) => {
      res.render("photo/photo", { photos });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/photo/add", (req, res, next) => {
  console.log("does this work?", req.user);
  res.render("photo/photo-add");
});

router.post(
  "/photo/add",
  uploader.single("photo"),
  loginCheck(),
  (req, res, next) => {
    const { description } = req.body;
    // cloudinary information
    const imgName = req.file.originalname;
    const imgPath = req.file.url;
    const imgPublicId = req.file.public_id;

    console.log(imgName, imgPath, imgPublicId);

    Photo.create({
      owner: req.user._id,
      description,
      // comment,
      imgName,
      imgPath,
      imgPublicId,
    })
      .then((photo) => {
        res.redirect("/user-profile");
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.post("/photo/:id/comments", (req, res, next) => {
  const { user, comments } = req.body.photo;
  Book.findByIdAndUpdate(req.params.photoId, {
    $push: {
      photos: {
        user: user,
        comments: comments,
      },
    },
  })
    .then((photo) => {
      res.redirect(`/photo/${photo._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/photo/delete/:id", (req, res, next) => {
  Photo.findByIdAndDelete(req.params.id)
    .then((photo) => {
      // if the movie has an imgPath then delete the image on cloudinary
      if (photo.imgPath) {
        cloudinary.uploader.destroy(photo.imgPublicId);
      }
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
