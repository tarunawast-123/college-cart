//const {Router} =require('express')
//const route=Router()
const express = require("express");
const route = express.Router();
let { Name } = require("../server");
// console.log(Name+"HIHIHIH")

const Posts = require("../db/posts").Posts;
const Users = require("../db/posts").Users;
const isAuth = require("../middleware/isauth");
//for getting a single post,send a get request to http://localhost:8384/api/posts
// with id of post in the query
route.get(
  "/",
  isAuth,
  (req, res) => {
    Name = require("../server").Name;
    Posts.findOne({ include: Users, where: { id: req.query.id } }).then(
      (post) => {
        res.send(post);
      }
    );
  } //[{Users}]
);
//for getting all posts, just send a request at http://localhost:8384/api/posts/allposts
route.get("/allposts", isAuth, (req, res) => {
  Posts.findAll({ include: Users }).then((posts) => {
    res.send(posts);
  });
});
//for a new post-send UserName,title,body of the post to http://localhost:8384/api/posts
route.post("/", isAuth, (req, res) => {
  const users = Users.findOne({ where: { username: req.body.UserName } }).then(
    (user) => {
      let id = user.id;
      Posts.create({
        title: req.body.title,
        body: req.body.body,
        userId: id,
      }).then((post) => {
        res.send(post);
      });
    }
  );
});
//for update-send the UserName,postid,and title and body of post to http://localhost:8384/api/posts/update

route.post("/update", isAuth, (req, res) => {
  const users = Users.findOne({ where: { username: req.body.UserName } }).then(
    (user) => {
      let id = user.id;
      Posts.findOne({ where: { id: req.body.postid } }).then((post) =>
        post.update({
          title: req.body.title,
          body: req.body.body,
          userId: id,
        })
      );
    }
  );
  res.send();
});

module.exports = {
  route,
};
