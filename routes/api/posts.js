const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Posts = require("../../schemamodels/posts");
const User = require("../../schemamodels/users");

router.post("/newPost", async (req, res) => {
  console.log("using: ", req.body);
  //res.send("newPost route found");
  try {
    const post = await Posts.create({
      user: req.body.user,
      post: req.body.post,
    });
    let user = req.body.user;
    user.posts.push(post);
    console.log("The user submitting this is, ", user);
    User.findByIdAndUpdate(req.body.user, user).then((data) => {
      console.log("New Data");
      res.send(data);
    });
    console.log("good");
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
