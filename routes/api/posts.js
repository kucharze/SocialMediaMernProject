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
    res.status(400).json({ msg: "Error creating a new post" });
  }
});

router.get("/", async (req, res) => {
  // res.json("the found posts");
  let posts = [];
  try {
    console.log("Attempting to poll posts");
    Posts.find({}).then(async (data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const puser = await User.findById({ _id: data[i].user });
        console.log("new user found,", puser);
        posts.push({ post: data[i], user: puser });
      }
      console.log("the posts: ", posts);
      res.json(posts);
    });
    // console.log("Postlist: ", postList);
  } catch (error) {
    res.status(400).json({ msg: "Error pulling posts" });
  }
});

module.exports = router;
