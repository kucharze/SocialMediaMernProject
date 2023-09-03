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

router.put("/edit", async (req, res) => {
  console.log("Editing a post");

  try {
    console.log("You found the edit post route");
    let oldPost = await Posts.findById(req.body.id);

    console.log(oldPost);

    await Posts.findByIdAndUpdate(req.body.id, req.body.post);
    res.status(200).json("A good edit");
  } catch (error) {
    console.log("edit posts error", error);
  }
});

router.delete("/delete", (req, res) => {
  console.log("Found the delete route");
});

module.exports = router;
