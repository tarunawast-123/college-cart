import React from "react";
import logo from "./logo.svg";
import { Router, Route, Redirect } from "react-router";
import createHistory from "history/createBrowserHistory";
import "./App.css";
import { Component } from "react";
import { Login } from "./component/login";
import { Home } from "./component/home";
import { Navbar1 } from "./component/navbar";
import { Myposts } from "./component/myposts";
import { Newblog } from "./component/newblog";
import { Postdetails } from "./component/postdetails";
import { Profile } from "./component/profile";
import { Update } from "./component/update";
import { Updateprofile } from "./component/updateprofile";

export class App extends Component {
  render() {
    return (
      <Router history={createHistory()}>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/myposts" component={Myposts} />
        <Route path="/newblog" component={Newblog} />
        <Route path="/postdetails" component={Postdetails} />
        <Route path="/profile" component={Profile} />
        <Route path="/update" component={Update} />
        <Route path="/updateProfile" component={Updateprofile} />
      </Router>
    );
  }
}

export default App;
