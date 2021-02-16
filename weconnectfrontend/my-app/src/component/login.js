import React from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router";
import { Link } from "react-router-dom";

import { Component } from "react";
const userContext = React.createContext();
const userProvider = userContext.Providerconst;
const userConsumer = userContext.Consumer;

export class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: "",
      password: "",
    };
  }
  handlesignupclick() {
    console.log(this.state.username);
    fetch(`http://localhost:8384/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
  }
  handleloginclick() {
    //  console.log(this.state.username + " " + this.state.password);
    const response1 = fetch("http://localhost:8384/api/loginuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        response = response.json();
        return response;
      })
      .then((response) => {
        if (response.token == null) {
          console.log("username or password did not match");
        } else {
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", this.state.username);
          this.props.history.push({ pathname: "/home", data: response });
        }
      });
    //console.log(response);
  }
  handleusername(event) {
    console.log(event);
    if (!event) return;
    this.setState({
      username: event.target.value,
    });
  }
  handlepassword(event) {
    console.log(event);
    if (!event) return;
    this.setState({
      password: event.target.value,
    });
  }
  render() {
    // var Link = Router.Link;
    return (
      <div className="App">
        <div className="col card ">
          <div className="anotherclass">
            <h4>Welcome To</h4>
            <h1>WE CONNECT</h1>
          </div>
          <input
            className="form-control border border-secondary container"
            type="text"
            id="username"
            placeholder="Username"
            onChange={this.handleusername.bind(this)}
            style={{ width: "23rem" }}
          />
          <input
            className="form-control border border-secondary mt-1 container"
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.handlepassword.bind(this)}
            style={{ width: "23rem" }}
          />
          <button
            type="submit"
            className="btn btn-outline-primary mt-2 container"
            style={{ backgroundColor: "red" }}
            fontSize="10rem"
            id="login"
            onClick={() => this.handleloginclick()}
            style={{ width: "18rem" }}
          >
            LOGIN
          </button>
          <button
            className="btn btn-primary mt-2 container"
            type="submit"
            onClick={() => this.handlesignupclick()}
            style={{ width: "18rem" }}
          >
            SIGN UP
          </button>
          {/* <!-- <btn id="signup" id="signup" style="background-color: rgb(153, 144, 231);">SIGN UP</btn> --> */}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // this.callapi();
  }
  callapi() {
    // console.log("HIHI")
    fetch("http://localhost:8384/api/test")
      .then((res) => {
        console.log(res);
        return res.text();
      })
      .then((res) => {
        this.setState({ response: res });
      });
  }
}
export default { userProvider, Login, userConsumer };
