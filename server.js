const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const http = require("http");
app.use(fileUpload());

const socketio = require("socket.io");
const server = http.createServer(app);
var cors = require("cors");
const io = socketio(server);
const { Users } = require("./db/posts");
let Name;
let Pass;
//const route = express.Router();
const postroute = require("./routes/posts").route;
const userroute = require("./routes/users").route;
const loginuserroute = require("./routes/loginuser").route;
const followroute = require("./routes/follow").route;

//  const {db}=require('./db/db')
//  db.sync()
io.on("connection", (socket) => {
  console.log("connected with socket id =", socket.id);
  socket.on("login", (user1) => {
    console.log("idhar " + user1.username);
    Name = user1.username;
    module.exports = {
      Name,
    };
    Users.findOne({
      where: { username: user1.username, password: user1.password },
    }).then((user2) => {
      //  console.log(user2.password+">>>>>>>>>>"+user2.username+">>>"+user1.username)
      if (user2) {
        if (user1.password.localeCompare(user2.password) == 0) {
          // window.alert('successfully logged in')
          Pass = user2.password;
          socket.join(Name);
          socket.emit("logged_in");
        } else {
          socket.emit("something wrong");
          //   window.alert('wrong password')
        }
      } else {
        socket.emit("something wrong");
        // window.alert('username does not exist')
      }
    });
  });
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", postroute);
app.use("/api/users", userroute);
app.use("/api/loginuser", loginuserroute);
app.use("/api/follow", followroute);
//app.use('/public','./public')
app.use("/public", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/login"));
//app.use('/public/ap',express.static(__dirname+"/public/addpost.html"))

server.listen(8384, () => {
  console.log("server started on http://localhost:8384");
}); //route.initialize(app);
console.log(Name);
app.post("/api/upload/", (req, res) => {
  console.log("##################################");
  console.log(req.files);
  const file = req.files.file;
  console.log(__dirname);
  file.mv(`../weconnectfrontend/my-app/src/images/${file.name}`);
});
