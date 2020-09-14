const mongoose = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

mongoose.connect("mongodb://localhost/photography-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const user = [
  {
    username: Esther,
    password: ,
    githubId: String,
    avatar: String,
    location: [Berlin],
    category: [Wedding, Landscape],
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    role: {
      type: "user",
      enum: ["user", "admin"],
      default: "user",
    },
    {
      username: Roxanne,
      password: ,
      githubId: String,
      avatar: String,
      location: [Berlin],
      category: [Nature, Portrait],
      gallery: [
        {
          type: Schema.Types.ObjectId,
          ref: "Photo",
        },
      ],
      favorites: [
        {
          type: Schema.Types.ObjectId,
          ref: "Photo",
        },
      ],
      role: {
        type: "user",
        enum: ["user", "admin"],
        default: "user",
      },
  },
  {
    username: Timmy,
    password: ,
    githubId: String,
    avatar: String,
    location: [Wales],
    category: [Family, Landscape],
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],
    role: {
      type: "user",
      enum: ["user", "admin"],
      default: "user",
    },

];
