const mongoose = require("mongoose");

const Posts = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    post: { type: String, required: true },
  },
  {
    timestamps: true, //Tells when the timestamp has been created or last updated
  }
);

module.exports = mongoose.model("Posts", Posts);
