const express = require("express");
const route = express.Router();
const Users = require("../db/posts").Users;
const Posts = require("../db/posts").Posts;
const Following = require("../db/posts").Following;
const isAuth = require("../middleware/isauth");
//get the user using the username or password
route.get("/", (req, res) => {
  if (req.query.username) {
    console.log("**************" + req.query.username);
    Users.findOne({
      where: { username: req.query.username },
      include: Posts,
    }).then((user) => res.send(user));
  } else if (req.query.id) {
    const user = Users.findOne({
      include: Posts,
      where: { id: req.query.id },
    }).then((user) => res.send(user));
  }
});
//to get all the users
route.get("/allusers", (req, res) => {
  Users.findAll({ include: Posts, Following }).then((users) => {
    res.send(users);
  });
});
//posting a new user, only when performing signups

route.post("/", async (req, res) => {
  {
    console.log("*********************aman");
    const user = await Users.findOne({
      where: { username: req.body.username },
    }).then((user) => user);
    if (user) {
      res.send("User already exists");
    } else {
      Users.create(
        {
          username: req.body.username,
          password: req.body.password,
          git: req.body.git,
          fb: req.body.fb,
          email: req.body.email,
          twitter: req.body.twitter,
          imageurl: null,
        },
        {
          where: { username: req.body.username },
          returning: true,
          plain: true,
        }
      ).then((user) => {
        res.send(user);
      });
    }
  }
});
//updating the existing user
route.post("/update", (req, res) => {
  Users.findOne({ where: { username: req.body.username } }).then((user) =>
    user.update({
      imageurl: req.body.imageurl,
      password: req.body.password,
      fb: req.body.fb,
      twitter: req.body.twitter,
      email: req.body.email,
      git: req.body.git,
    })
  );
});

module.exports = {
  route,
};
