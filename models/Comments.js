const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  photo_Id: {
    type: Schema.Types.ObjectId,
    ref: "Photo",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
