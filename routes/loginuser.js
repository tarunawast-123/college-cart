const express = require("express");
const route = express.Router();
const Posts = require("../db/posts").Posts;
const Users = require("../db/posts").Users;
const jwt = require("jsonwebtoken");
var badshah = "";

const isAuth = require("../middleware/isauth");
route.post("/", async (req, res) => {
  badshah = "";
  const user = await Users.findOne({
    include: Posts,
    where: { username: req.body.username },
  });
  if (user) {
    if (user.password == req.body.password) {
      badshah = req.body.username;
      const token = jwt.sign(
        { userId: user.id },
        "94DHWWHEdjfksk54ihe3#*^!382",
        { expiresIn: "1h" }
      );
      res.send({ token: token });
    } else {
      console.log("password did not match");
      res.send({ token: null });
    }
  } else {
    res.send({ token: null });
  }
});

module.exports = {
  badshah,
  route,
};
