import React from "react";
import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router-dom";
// var React = require("react");
import { IoIosPerson } from "react-icons/io";
import { Router, Route } from "react-router";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export class Navbar1 extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "" };
  }
  componentDidMount() {
    const { username } = this.props;
    this.setState({ username: username });
  }

  render() {
    return (
      <Navbar className="navbar-light " bg="dark" text="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" text="light">
            {/* <Nav.Link> */}
            <Link
              to={{ pathname: "./myposts", data: this.state.username }}
              style={({ color: "black" }, { padding: ".5rem" })}
            >
              My Posts
            </Link>

            <Nav.Link href="./newblog">Write a New Blog</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline> */}
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          {/* <Button variant="outline-success">Search</Button> */}
          {/* </Form> */}
          <Link to={`./login`}>Logout</Link>
          <Link to={`./profile?username=${localStorage.getItem("username")}`}>
            <IoIosPerson
              size="3rem"
              color="white"
              style={{ marginRight: ".02rem" }}
            ></IoIosPerson>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbar1;
