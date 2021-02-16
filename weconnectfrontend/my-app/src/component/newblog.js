import React, { Component } from "react";

export class Newblog extends Component {
  constructor(props) {
    super(props);

    this.state = { UserName: "", title: "", body: "", updatehai: 0 };
  }

  handletitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  handlebody(event) {
    this.setState({
      body: event.target.value,
    });
  }
  handlesubmitclick() {
    const { UserName, title, body } = this.state;

    if (body == "" || title == "") {
      console.log("No field should be left empty");
      return;
    }
    // console.log("HI " + title + " " + body);
    if (this.state.updatehai == 1) {
      fetch("http://localhost:8384/api/posts/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...this.state,
          postid: localStorage.getItem("postid"),
        }),
      }).then(() => {
        console.log(" BLOG updated successfully");
        this.props.history.push({ pathname: "/home" });
      });
    } else {
      fetch("http://localhost:8384/api/posts/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...this.state,
        }),
      }).then(() => {
        console.log("NEW BLOG posted successfully");
        this.props.history.push({ pathname: "/home" });
      });
    }
  }
  componentDidMount() {
    const { data } = this.props.location;
    this.setState({
      UserName: localStorage.getItem("username"),
    });
    if (data) {
      this.setState({ updatehai: 1 });

      console.log(data.postid);
      fetch(`http://localhost:8384/api/posts?id=${data.postid}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((post) => post.json())
        .then((post) => {
          this.setState({
            title: post.title,
            body: post.body,
          });
        });
    }
    this.setState({
      UserName: localStorage.getItem("username"),
    });
  }
  render() {
    return (
      <>
        <input
          className="form-control border border-secondary"
          type="text"
          style={{
            marginLeft: "1rem",
            marginTop: "1.5rem",
            width: "65rem",
          }}
          id="username"
          value={this.state.title}
          placeholder="Your Title starts here   "
          onChange={this.handletitle.bind(this)}
        />
        <textarea
          className="form-control border border-secondary mt-12"
          type="text-area"
          size="100rem"
          rows="4"
          id="password"
          value={this.state.body}
          placeholder="Your Body goes here...."
          style={{
            marginLeft: "1rem",
            marginRight: "2rem",
            width: "65rem",
            marginTop: "1rem",
            height: "19rem",
            paddingTop: "0rem",
            verticalAlign: "bottom",
          }}
          onChange={this.handlebody.bind(this)}
        />
        <button
          type="submit"
          className="btn btn-outline-primary mt-2"
          //   style={{ backgroundColor: "red" }}
          fontSize="10rem"
          style={{ marginLeft: "5rem", width: "14rem" }}
          id="login"
          onClick={() => this.handlesubmitclick()}
        >
          {" "}
          SUBMIT
        </button>
      </>
    );
  }
}

export default Newblog;
