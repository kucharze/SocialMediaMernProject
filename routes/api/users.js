const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const usersCtrl = require("../../controllers/api/users");

const User = require("../../schemamodels/users");
const Posts = require("../../schemamodels/posts");

router.post("/", async (req, res) => {
  try {
    console.log("Attempting to save a user");
    const user = await User.create(req.body);
    res.json(createJWT(user));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Attempting to find a user");
    const user = await User.findOne({ email: req.body.email });
    // res.json(createJWT(user));
    if (!user) {
      console.log("Not sucessful finding a user");
      res.status(400).json({ msg: "Login failed" });
      return;
    }
    console.log("Trying to compare password");
    console.log("user found:", user);
    let match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      res.json(createJWT(user));
    } else {
      throw new Error("Failed login");
    }
    // res.json("We have found a device");
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error.message);
  }
});

router.get("/findUser/:id", async (req, res) => {
  console.log("Searching for a user using ", req.params.id);
  let id = req.params.id;

  try {
    const user = await User.findById(id);
    console.log(user);

    if (user) {
      console.log("Good user");
      const posts = await findPosts(user.posts);
      //console.log("item is ", posts);
      res.status(200).json({ user, posts });
    } else {
      console.log("bad user");
      res.status(400).json("No user found");
    }
  } catch (error) {
    console.log(error._message);
    res
      .status(400)
      .json({ msg: "Error searching for user", reason: error._message });
  }
});

const findPosts = async (posts) => {
  console.log("We are looking for the posts");
  console.log("the posts", posts);
  let postList = [];
  try {
    // Posts.findById({ id: posts[0] }).then((data) => {
    //   console.log("Found post ", data);
    // });
    for (let i = 0; i < posts.length; i++) {
      let item = await Posts.findById(posts[0]);
      //console.log(item);
      postList.push(item);
    }
    //console.log(postList);
    return postList;
  } catch (error) {
    console.log("post error", error._message);
  }
};

module.exports = router;

function createJWT(user) {
  console.log("Inside createjwt");
  return jwt.sign(
    //datapayload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
