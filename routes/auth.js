const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.get("/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// function checkboxFunction() {
//   // Get the checkbox
//   var checkBox = document.getElementById("myCheck");
//   // Get the output text
//   var text = document.getElementById("text");

//   // If the checkbox is checked, display the output text
//   if (checkBox.checked == true) {
//     text.style.display = "block";
//   } else {
//     text.style.display = "none";
//   }
// }

router.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    category,
    location,
    gallery,
    favorites,
    role,
  } = req.body;
  console.log("this is reqbody", req.body);
  if (password.length < 8) {
    res.render("auth/signup", {
      message: "Your password needs to be 8 chars min",
    });
    return;
  }
  if (username === "") {
    res.render("auth/signup", { message: "Your username cannot be empty" });
    return;
  }
  // check if username exists in database -> show message
  User.findOne({ username: username }).then((found) => {
    if (found !== null) {
      res.render("auth/signup", { message: "This username is already taken" });
    } else {
      // hash the password, create the user and redirect to profile page
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        username: username,
        password: hash,
        category: category,
        location: location,
        gallery: gallery,
        role: role,
        favorites: favorites,
      }).then((dbUser) => {
        console.log("this is dbUser", dbUser);
        // log the user in
        // res.render('dashboard', { user: dbUser });
        // login with passport:
        // req.login();
        res.redirect("/login");
      });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);

router.get("/logout", (req, res) => {
  // logout the user using passport
  req.logout();
  res.redirect("/");
});

module.exports = router;
