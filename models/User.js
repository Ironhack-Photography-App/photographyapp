const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  githubId: String,
  avatar: String,
  location: [],
  category: [String],
  gallery: [{
    type: Schema.Types.ObjectId,
    ref: "Photo",
  }, ],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Photo",
  }],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;