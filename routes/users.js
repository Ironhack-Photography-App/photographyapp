const express = require("express");
const router = express.Router();
const { uploader, cloudinary } = require("../config/cloudinary");
const Photo = require("../models/Photo");
const User = require("../models/User");
const { loginCheck } = require("./middlewares");

module.exports = router;
