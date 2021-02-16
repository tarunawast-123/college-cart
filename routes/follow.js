const express = require("express");
const route = express.Router();
const { Users } = require("../db/posts");
const following = require("../db/posts").Following;
const isAuth = require("../middleware/isauth");
//get all those whom a user follows
route.get("/", isAuth, (req, res) => {
  Users.findOne({ where: { username: req.query.p1 } }).then((user) => {
    let id = user.id;
    following
      .findAll({ include: Users, where: { userId: id } })
      .then((people) => {
        res.send(people);
      });
  });
});
//
route.post("/", isAuth, (req, res) => {
  Users.findOne({ where: { username: req.body.p1 } }).then((user) => {
    let id = user.id;
    following
      .findOne({ where: { naam: req.body.p2, userId: id } })
      .then((user) => {
        if (!user) {
          following
            .create({ naam: req.body.p2, userId: id })
            .then((followinglist) => {
              console.log(req.body.p1 + " is now following " + req.body.p2);
              res.send();
            });
        }
      });
  });
});
module.exports = {
  route,
};
