const express = require("express");
const router = express.Router();
// const usersCtrl = require("../../controllers/api/users");

router.post("/", (req, res) => {
  console.log("Found a route for a post");
  res.json("We are ok");
});

module.exports = router;
