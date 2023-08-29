const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const usersCtrl = require("../../controllers/api/users");

const User = require("../../schemamodels/users");

router.post("/", async (req, res) => {
  console.log("Found a route for a post");
  // res.json("We are ok");

  try {
    console.log("Attempting to save a user");
    const user = await User.create(req.body);
    res.json(createJWT(user));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
});

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
