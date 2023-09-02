const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Posts = require("../../schemamodels/posts");
const User = require("../../schemamodels/users");

router.post("/newPost", async (req, res) => {
  console.log("We are creating a new post");
  console.log("using: ", req.body);
  // res.send("newPost route found");
  try {
    let user = await User.findById(req.body.id);
    const post = await Posts.create({
      user: user,
      post: req.body.post,
    });

    user.posts.push(post);
    console.log("The user submitting this is, ", user);
    console.log("The new post: ", post);
    await User.findByIdAndUpdate(req.body.id, user).then((data) => {
      console.log("New Data");
      console.log("The new data: ", data);
      res.json(data);
    });
  } catch (error) {
    console.log(error._message);
    res
      .status(400)
      .json({ msg: "Error creating a new post", reason: error._message });
  }
});

router.get("/", async (req, res) => {
  // res.json("the found posts");
  let posts = [];
  try {
    console.log("Attempting to poll posts");
    Posts.find({}).then(async (data) => {
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        const puser = await User.findById({ _id: data[i].user });
        //console.log("new user found,", puser);
        posts.push({ post: data[i], user: puser });
      }
      res.json(posts);
    });
    // console.log("Postlist: ", postList);
  } catch (error) {
    res.status(400).json({ msg: "Error pulling posts" });
  }
});

router.get("/userPosts/:posts", async (req, res) => {
  try {
    let userPosts = [];
    console.log("We found this route");
    console.log("The posts are", req.params.posts);
    console.log("Posts is a ", typeof req.params.posts);
    let postList = req.params.posts.split(",");
    console.log(postList);

    let item = await Posts.find({ id: postList[0] });
    console.log("The item is", item);
    res.json("We have returned data " + postList);
  } catch (error) {
    console.log("We had an error", error._message);
  }
});

module.exports = router;
