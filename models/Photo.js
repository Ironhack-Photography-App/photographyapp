const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const photoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  imgName: String,
  imgPath: String,
  imgPublicId: String,
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
