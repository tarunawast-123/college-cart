import React, { Component } from "react";
// import { Card } from "@material-ui/core";
import Card from "react-bootstrap/Card";
import ZIndex from "react-z-index"; // component, util
import { zIndex } from "react-z-index";
// import Card from material;
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./navbar";
import { Link } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import profile from "../images/aman.jpg";
import ExampleComponent from "react-rounded-image";
import bg from "../images/bg.jpg";
const styles = {
  transition: "all .3s ease-out",
};
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deg: "0deg",
      scale: "1",
      users: [],
      UserName: "",
      peopleyoufollow: [],
      currentstate: "FOLLOW",
      shadow: "3",
      val: "shadow",
      disabled: "disabled",
      source: "",
      cc: 0,
    };
  }
  async componentDidUpdate() {
    //   console.log("componentdidupdate");
    // console.log("hahahaha");
  }
  async componentDidMount() {
    //  console.log("componentdidmount");
    // console.log("hahahaha");
    // const { data } = this.props.location;
    //  this.setState({ UserName: data });
    const users = await fetch("http://localhost:8384/api/users/", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((p) => {
        return p.json();
      })
      .then((p) => {
        this.setState({
          users: p,
        });
        return p;
      });
    fetch(
      `http://localhost:8384/api/follow?p1=${localStorage.getItem("username")}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((pyf) => pyf.json())
      .then((pyf) => this.setState({ peopleyoufollow: pyf }));
  }
  handlehover() {
    //   console.log("HEY");
  }
  async handlefollowclick(username) {
    this.setState({ currentstate: "unfollow", cc: 1 });

    //alert(event.currentTarget.textContent);
    await fetch(`http://localhost:8384/api/follow`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p2: username,
        p1: localStorage.getItem("username"),
      }),
    });
    const { data } = this.props.location;
    this.setState({ UserName: data });
    const users = await fetch("http://localhost:8384/api/users/", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((p) => {
        return p.json();
      })
      .then((p) => {
        this.setState({
          users: p,
        });
        return p;
      })
      .then(
        fetch(
          `http://localhost:8384/api/follow?p1=${localStorage.getItem(
            "username",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )}`
        )
          .then((pyf) => pyf.json())
          .then((pyf) => this.setState({ peopleyoufollow: pyf }))
          .then(this.render())
      );

    await this.setState({ currentstate: "unfollow" });
    // this.setState({});
    // const name = localStorage.getItem("username");
    // console.log(postid);
    console.log("handlefollowclick");
  }
  handlecountclick(cc1) {
    this.setState({ cc: cc1 + 1 });
  }
  render() {
    console.log("render");
    const { peopleyoufollow, cc } = this.state;
    const { data } = localStorage.getItem("username");
    // const{data} =this.props.location;
    // console.log(data);
    return (
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "1100px",
          backgroundPosition: "center center",
          // width: "1200px",
          // height: "1400px",
          // transform: "scale(1)",
        }}
      >
        <Navbar1 username={localStorage.getItem("username")}></Navbar1>
        <br></br>
        <br></br>

        {/* <img src={profile} width="50rem" height="50rem" /> */}

        <div style={{ display: "table-row" }}>
          <div
            style={{
              display: "table-cell",
              marginLeft: "2rem",
              marginTop: "2rem",
            }}
          >
            {this.state.users.map((user) => {
              let found = null;
              let cs = "follow";

              found = peopleyoufollow.find((user1) => {
                let ans1 = user.username;
                return ans1.localeCompare(user1.naam) == 0;
              });
              //    console.log("Ye kuch naya hai ");
              //     console.log(found);
              if (found) {
                cs = "uniFollow";
              } else {
                cs = "Follow";
              }
              console.log("##########################################");
              console.log(user.posts6s);
              console.log(user);
              const posts = user.posts6s;
              //  console.log(user.username + "->");
              //  console.log(user.posts5s);

              {
                if (posts.length > 0) {
                  //        console.log("idhar aaye");
                  return posts.map((post, ind) => {
                    var source = "";
                    //        console.log(post.title);
                    if (user.imageurl)
                      source = require(`../images/${user.imageurl}`);
                    //  console.log(post.username);
                    return (
                      <>
                        <Card
                          onMouseEnter={() => {
                            //              console.log(this.state.val);
                            this.setState({ val: "shadow-lg" });
                            //              console.log(this.state.val);
                            this.setState({
                              scale: "1.1",
                              deg: "0deg",
                            });
                          }}
                          onMouseLeave={() => {
                            {
                              this.setState({ val: "shadow" });
                              this.setState({
                                scale: "1",
                                deg: "0deg",
                              });
                            }
                          }}
                          className={`card ${this.state.val} p-3 mb-5 bg-light rounded `}
                          bg="light"
                          text="dark"
                          zDepth={this.state.shadow}
                          // className="card shadow p-3 mb-5 bg-light rounded "
                          zIndex="5rem"
                          style={{
                            zIndex: "5rem",
                            marginLeft: "2rem",
                            width: "42rem",
                            height: "32",
                          }}
                          id="card"
                        >
                          <Card.Body>
                            <Card.Header>
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                              >
                                <ExampleComponent
                                  image={source}
                                  roundedColor="#321124"
                                  imageWidth="50"
                                  imageHeight="50"
                                  roundedSize="2"
                                ></ExampleComponent>
                              </div>
                              <div style={{ display: "inline-block" }}></div>
                              <div
                                style={{
                                  display: "inline-block",
                                  float: "right",
                                  //      marginInlineEnd: "true",
                                }}
                              >
                                <Link to={`${user.git}`}>
                                  <AiFillGithub
                                    size="2.3rem"
                                    style={{
                                      //        marginLeft: "16rem",
                                      marginTop: "-.1 rem",
                                    }}
                                  ></AiFillGithub>
                                </Link>
                                <a>
                                  <AiFillTwitterCircle
                                    size="2.3rem"
                                    style={{
                                      // marginRight: ".3rem",
                                      marginTop: "-.1 rem",
                                    }}
                                  ></AiFillTwitterCircle>
                                </a>
                                <Button
                                  id={ind}
                                  onClick={() =>
                                    this.handlefollowclick(user.username)
                                  }
                                  variant="outline-dark"
                                  style={{ padding: ".5rem" }}
                                >
                                  {cs.localeCompare("Follow") == 0 ? (
                                    <AiOutlinePlus
                                      size="1rem"
                                      style={{ marginTop: "-.3rem" }}
                                    ></AiOutlinePlus>
                                  ) : (
                                    ""
                                  )}
                                  {cs}
                                </Button>
                              </div>
                            </Card.Header>
                            <Card.Title>
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                              >
                                <h4
                                  style={{
                                    ...styles,
                                    transform:
                                      "scale3D(" +
                                      this.state.scale +
                                      "," +
                                      this.state.scale +
                                      "," +
                                      this.state.scale +
                                      ") scale(" +
                                      this.state.scale +
                                      ") rotateZ(" +
                                      this.state.deg +
                                      ")",
                                  }}
                                >
                                  {post.title}
                                </h4>
                              </div>
                            </Card.Title>
                            <Card.Text>
                              {post.body.substring(0, 300)}
                              <Link
                                to={{
                                  pathname: "./postdetails",
                                  data: { postid: post.id },
                                }}
                              >
                                {/* {localStorage.setItem("postid", post.id)} */}
                                ...Read More
                              </Link>
                            </Card.Text>
                            {/* <a href="postdetails.html?id=${singlepost.id}" {localStorage.setItem()}> */}
                            {/* ...Read More */}
                            {/* </a> */}
                          </Card.Body>
                        </Card>
                      </>
                    );
                  });
                }
              }
            })}
          </div>
          <div style={{ display: "table-cell" }}>
            <Card
              bg="dark"
              text="light"
              className="card h-322 w-14  "
              //  bg="dark"
              style={{
                marginLeft: "2rem",
                marginTop: "0rem",
                width: "20rem",
                height: "32",
                //   position: "fixed",
              }}
              id="card"
            >
              <Card.Body>
                <Card.Header>People You Follow</Card.Header>
                {peopleyoufollow.map((person) => {
                  return (
                    <Card.Text>
                      <Link
                        to={{
                          pathname: `./profile?username=${person.naam}`,
                        }}
                      >
                        {person.naam}
                      </Link>
                    </Card.Text>
                  );
                })}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
