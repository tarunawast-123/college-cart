import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { Redirect } from "react-router";

export class Updateprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isimagethere: false,
      fb: "",
      git: "",
      twitter: "",
      email: "",
      password: "",
      username: "",
      imageurl: "",
      image: null,
      source: "",
    };
  }
  handlefacebook = (e) => {
    this.setState({ fb: e.target.value });
  };
  handlegithub = (e) => {
    this.setState({ git: e.target.value });
  };
  handletwitter = (e) => {
    this.setState({ twitter: e.target.value });
  };
  handleemail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlepassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleusername = (e) => {
    this.setState({ username: e.target.value });
  };
  componentDidMount() {
    console.log("componentdidmount");

    fetch(
      `http://localhost:8384/api/users?username=${localStorage.getItem(
        "username"
      )}`
    )
      .then((user) => user.json())
      .then((user) => {
        if (user.imageurl) {
          this.setState({
            isimagethere: true,
          });
        }
        this.setState({
          fb: user.fb,
          git: user.git,
          twitter: user.twitter,
          email: user.email,
          password: user.password,
          username: user.username,
          imageurl: user.imageurl,
        });
      });
  }
  handlesubmit() {
    console.log(this.state.git);
    fetch(`http://localhost:8384/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fb: this.state.fb,
        git: this.state.git,
        twitter: this.state.twitter,
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        imageurl: this.state.imageurl,
      }),
    }).then(() => {});
  }
  handlechange = async (e) => {
    console.log("handlechange");
    await this.setState({
      imageurl: e.target.files[0].name,
      image: e.target.files[0],
    });
    const formdata = new FormData();
    await formdata.append("file", this.state.image);
    await axios
      .post(`http://localhost:8384/api/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        this.setState({ isimagethere: false });
        localStorage.setItem("isimagethere", false);
        fetch(`http://localhost:8384/api/users`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            imageurl: this.state.imageurl,
          }),
        });
      });
  };
  handleupload() {
    const formdata = new FormData();
    formdata.append("file", this.state.image);
    axios
      .post(`http://localhost:8384/api/upload`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        //  this.setState({ isimagethere: true });
        //  localStorage.setItem("isimagether", true);
      });
    fetch(`http://localhost:8384/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        imageurl: this.state.imageurl,
      }),
    });
  }
  render() {
    console.log("render");

    var source = "";

    console.log(this.state.username + " " + this.state.imageurl);
    setTimeout(() => {
      if (this.state.imageurl && this.state.imageurl.localeCompare("") != 0) {
        source = require(`../images/${this.state.imageurl}`);
      }
    }, 5000);
    return (
      <div style={{ marginLeft: "21rem", width: "25rem" }}>
        <h2 className="container mt-4 border-bottom border-dark">
          Your Profile Details{" "}
        </h2>
        <br></br>
        {/* <div style={{ display: "table-row" }}> */}
        {/* <div style={{ display: "table-cell" }}> */}
        {/* <AiFillGithub></AiFillGithub> */}
        {/* </div> */}
        <div
          className=" border border-secondary rounded mb-0 "
          style={{ paddingTop: "1rem", paddingBottom: ".5rem" }}
        >
          {this.state.isimagethere == true ? (
            <img style={{ marginLeft: "4rem" }} src={source}></img>
          ) : (
            <>
              <IoMdPersonAdd
                style={{ marginLeft: "4rem" }}
                size="2rem"
              ></IoMdPersonAdd>
              <input
                size=".2rem"
                type="file"
                onChange={this.handlechange}
              ></input>
              <br></br>
              <Button
                style={{
                  marginLeft: "7rem",
                  paddingTop: "0rem",
                  paddingBottom: "0rem",
                }}
                variant="dark"
                onClick={() => this.handleupload()}
              >
                Upload
              </Button>
            </>
          )}
        </div>

        {/* </div> */}
        <input
          type="email"
          value={this.state.email}
          onChange={this.handleemail}
          className="form-control border border-secondary mt-1"
          style={{ width: "25rem" }}
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlepassword}
          style={{ width: "25rem" }}
          className="form-control border border-secondary mt-1"
          placeholder="Password"
        ></input>
        <input
          type="text"
          value={this.state.git}
          onChange={this.handlegithub}
          style={{ width: "25rem" }}
          className="form-control border border-secondary mt-1"
          placeholder="Github handle"
        ></input>
        <input
          type="text"
          value={this.state.twitter}
          onChange={this.handletwitter}
          style={{ width: "25rem" }}
          className="form-control border border-secondary mt-1"
          placeholder="Twitter handle"
        ></input>
        <input
          type="text"
          value={this.state.fb}
          onChange={this.handlefacebook}
          style={{ width: "25rem" }}
          className="form-control border border-secondary mt-1"
          placeholder="Facebook handle"
        ></input>
        <Button
          variant="outline-primary mt-4"
          style={{
            marginLeft: "8rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: ".1rem",
            fontSize: "1.2rem",
          }}
          onClick={() => this.handlesubmit()}
        >
          SUBMIT
        </Button>
      </div>
    );
  }
}

export default Updateprofile;
