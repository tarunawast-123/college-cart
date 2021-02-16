import React from "react";
import { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillGithub } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

import { Link } from "react-router-dom";
export class Myposts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      UserName: "",
    };
  }

  async componentDidMount() {
    const data = localStorage.getItem("username");
    console.log("Called " + data);
    this.setState({
      UserName: data,
    });
    const user = await fetch(
      `http://localhost:8384/api/loginuser?username=${data}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((p) => {
        console.log(p);
        return p.json();
      })
      .then((user) => {
        console.log(user);
        console.log("HAHAHA ");
        console.log(user);
        return user;
      });
    const posts1 = await user.posts6s;
    await this.setState({
      posts: posts1,
    });
    /* const posts1 = await fetch(
      `http://localhost:8384/api/posts?userId=${user.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },}
    )
      .then((p) => {
        console.log(p);
        return p.json();
        //const pi = p.json();
        // var arr = [];
        // for (var i in pi) {
        // arr.push([i, pi[i]]);
        // }
        // return arr;
      })
      .then((posts1) => {
        console.log(posts1);
        this.setState({
          posts: posts1,
        });
      });*/
  }
  render() {
    // const { data } = this.props.location;
    const { posts } = this.state;
    //  console.log("HI" + posts);
    //  console.log(posts);
    // this.componentDidMount();
    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {posts.map((post) => {
          return (
            <>
              <Card
                className="card h-322 w-14"
                style={{ width: "42rem", marginLeft: "13rem", height: "32" }}
                id="card"
              >
                <Card.Body>
                  <Card.Header>
                    <div style={{ display: "inline-block" }}>
                      <h2>{post.title}</h2>
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <Link
                        to={`./profile?username=${localStorage.getItem(
                          "username"
                        )}`}
                      >
                        <AiFillGithub
                          size="2.3rem"
                          style={{ marginLeft: "16.8rem", marginTop: "-.7rem" }}
                        ></AiFillGithub>
                      </Link>
                      <a>
                        <AiFillTwitterCircle
                          size="2.3rem"
                          style={{ marginLeft: ".3rem", marginTop: "-.7rem" }}
                        ></AiFillTwitterCircle>
                      </a>
                    </div>
                  </Card.Header>
                  <Card.Text>{post.body.substring(0, 300)}</Card.Text>
                  <Link
                    to={{
                      pathname: "./postdetails",
                      data: { username: this.state.username, postid: post.id },
                    }}
                  >
                    ...Read More
                  </Link>
                </Card.Body>
              </Card>
              <br></br>
              <br></br>
            </>
          );
        })}
      </>
    );
  }
}

export default Myposts;
