import React, { Component } from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export class Postdetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postid: "",
      UserNameOfPost: "",
      post: "",
      currentstate: "FOLLOW",
      username: "",
    };
  }
  componentDidMount() {
    const postid = localStorage.getItem("postid");
    // this.setState({});
    // const name = localStorage.getItem("username");
    fetch(`http://localhost:8384/api/posts?id=${postid}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((post) => post.json())
      .then((post) => {
        fetch(`http://localhost:8384/api/users?id=${post.userId}`)
          .then((user) => {
            return user.json();
          })
          .then((user) => {
            console.log(user);
            localStorage.setItem("UserNameOfPost", user.username);
            this.setState({ UserNameOfPost: user.username });
            fetch(
              `http://localhost:8384/api/follow?p1=${localStorage.getItem(
                "username"
              )}`,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
              .then((followinglist) => followinglist.json())
              .then((followinglist) => {
                console.log(followinglist);
                var f = 0;
                followinglist.map((person) => {
                  if (
                    person.naam.localeCompare(this.state.UserNameOfPost) == 0
                  ) {
                    f = 1;
                    console.log("You are following " + user.username);
                    localStorage.setItem("currentstate", "FOLLOWING");
                    this.setState({
                      currentstate: "FOLLOWING",
                    });
                  } else {
                  }
                });
                if (f == 0) {
                  console.log("You are not following " + user.username);
                }
                //I am gonna write a database operation here(should only be written in the api or the controllers), which is not good
                //In futute, maybe I will change it
              });
          });
        this.setState({ post: post });
      });
    this.setState({
      postid: postid,
    });
  }
  handlefollowclick() {
    if (this.state.currentstate == "FOLLOW") {
      fetch(`http://localhost:8384/api/follow/`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p1: localStorage.getItem("username"),
          p2: this.state.UserNameOfPost,
        }),
      }).then(() => {
        console.log("You are now following " + this.state.UserNameOfPost);
        this.setState({
          currentstate: "FOLLOWING",
        });
        localStorage.setItem("currentstate", "FOLLOWING");
      });
    }
  }
  render() {
    const { data } = this.props.location;

    if (data) {
      localStorage.setItem("postid", data.postid);
    }
    const { post } = this.state;
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log(data.postid);
    return (
      <>
        {" "}
        <div className="col">
          <div>Written By-{this.state.UserNameOfPost}</div>
          <br></br>
          {this.state.UserNameOfPost.localeCompare(
            localStorage.getItem("username")
          ) == 0 ? (
            <Link
              to={{
                pathname: "./newblog",
                data: { username: this.state.username, postid: post.id },
              }}
            >
              <MdEdit></MdEdit>
            </Link>
          ) : (
            <h1></h1>
          )}
          <button
            type="submit"
            className="btn btn-outline-primary mt-2"
            style={{ backgroundColor: "red" }}
            fontSize="10rem"
            id="login"
            onClick={() => this.handlefollowclick()}
          >
            {this.state.currentstate}
          </button>
        </div>
        <br></br>
        <div>
          <div id="title">{post.title}</div>
          <br />

          <div id="body">{post.body}</div>
        </div>
        );
      </>
    );
  }
}

export default Postdetails;
