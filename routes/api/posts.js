const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Posts = require("../../schemamodels/posts");
const User = require("../../schemamodels/users");

router.post("/newPost", (req, res) => {
  res.send("newPost route found");
});

module.exports = router;
