const express = require("express");
const router = express.Router();
// const usersCtrl = require("../../controllers/api/users");

const User = require("../../schemamodels/users");

router.post("/", async (req, res) => {
  console.log("Found a route for a post");
  // res.json("We are ok");

  try {
    const user = await User.create(req.body);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
