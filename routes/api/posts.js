const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Posts = require("../../schemamodels/posts");
const User = require("../../schemamodels/users");

router.post("/newPost", (req, res) => {
  console.log("using: ", req.body);
  //res.send("newPost route found");
  try {
    const post = Posts.create({ user: req.body.user, post: req.body.post });
    console.log("good");
    res.send("good creation");
  } catch (error) {
    res.status(400).json({ msg: "Error pulling posts" });
  }
});

module.exports = router;
