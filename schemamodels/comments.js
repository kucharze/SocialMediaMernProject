const mongoose = require("mongoose");
const User = require("./users");

const Comments = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, required: true },
    commentList: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true, //Tells when the timestamp has been created or last updated
  }
);

module.exports = mongoose.model("Comments", Comments);
