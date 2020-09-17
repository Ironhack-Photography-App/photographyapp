const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const { loginCheck } = require("./middlewares");
const { uploader, cloudinary } = require("../config/cloudinary");
const User = require("../models/User");

router.get("/photo/add", (req, res, next) => {
  console.log("does this work?", req.user);
  res.render("photo/photo-add");
});

router.get("/photo/:photoId", (req, res, next) => {
  Photo.findById(req.params.photoId)
    .then((photo) => {
      res.render("photo/photo", {
        photo,
        user: req.user,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/photo/add",
  uploader.single("photo"),
  loginCheck(),
  (req, res, next) => {
    const { description, comment } = req.body;
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
        User.findByIdAndUpdate(req.user._id, {
          $push: {
            gallery: photo._id,
          },
        }).then((user) => {
          res.redirect("/user-profile");
        });
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.post("/favorite/:photoId", (req, res, next) => {
  console.log(req.user, " HERE");
  if (req.user.favorites.includes(req.params.photoId)) {
    return;
  }
  User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        favorites: req.params.photoId,
      },
    },
    {
      new: true,
    }
  )
    .then((user) => {
      console.log(user);
      res.redirect("/user-profile");
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/photo/:id/comments", (req, res, next) => {
  const { user, comment } = req.body.photo;
  Photo.findByIdAndUpdate(req.params.photoId, {
    $push: {
      photos: {
        user: user,
        comment: comment,
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
      res.redirect("/user-profile");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
