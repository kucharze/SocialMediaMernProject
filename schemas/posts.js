const mongoose = require("mongoose");

const Posts = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  post: { type: String, required: true },
});

module.exports = mongoose.model("Posts", Posts);
