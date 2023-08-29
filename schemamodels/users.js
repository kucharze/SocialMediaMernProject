const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, requried: true, lowercase: true, unique: true },
    password: { type: String, requried: true, minLength: 4 },
    posts: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    // Even though it's hashed - don't serialize the password
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

Users.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("Users", Users);
