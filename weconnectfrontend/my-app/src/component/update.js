import React, { Component } from "react";
import axios from "axios";

export class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("username"),
      imageurl: "",
      imagefile: null,
    };
  }

  handleonchange = (e) => {
    console.log(e.target.files[0]);
    localStorage.setItem("imgfile", e.target.files[0]);
    this.setState({
      username: localStorage.getItem("username"),
      imageurl: e.target.files[0].name,
      imagefile: e.target.files[0],
    });
  };
  handleupload() {
    console.log("FUFUFUFUFU");
    console.log(this.state.selectedimage);
    const formdata = new FormData();
    const file = this.state.imagefile;
    formdata.append("file", file);
    console.log("FUFUFUFUFU");
    console.log(formdata.get("file"));
    console.log(file);
    //  formdata.get("file").mv(`${__dirname}/propics/${file.name}`);
    axios.post("http://localhost:8384/api/upload/", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    fetch(`http://localhost:8384/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        imageurl: this.state.imageurl,
      }),
    });
    /*fetch(`http://localhost:8384/api/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: file }),
    });*/
    //formdata.
    // file.mv(`./images/${this.state.selectedimage.name}`);
    // fetch(`http://localhost:8384/api/users`, {
    //  method: "POST",

    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //  },
    //  body: JSON.stringify({
    //     username: localStorage.getItem("username"),
    //     imageurl: this.state.selectedimage.name,
    //   }),
    //  })
    //    .then((user) => user.json())
    //    .then((user) => {
    //      user.update({
    //        imageurl: this.state.selectedimage,
    //      });
    //    });
  }
  componentDidMount() {
    fetch(
      `http://localhost:8384/api/users?username=${localStorage.getItem(
        "username"
      )}`
    )
      .then((user) => user.json())
      .then((user) => {
        if (user.imageurl) localStorage.setItem("imageurl", user.imageurl);
      });
  }
  componentDidUpdate() {
    fetch(
      `http://localhost:8384/api/users?username=${localStorage.getItem(
        "username"
      )}`
    )
      .then((user) => user.json())
      .then((user) => {
        if (user.imageurl) localStorage.setItem("imageurl", user.imageurl);
      });
  }
  render() {
    const source = require(`../images/${localStorage.getItem("imageurl")}`);
    const filepath =
      "D:Web Projects/projects/WeConnectFrontend/my-app/src/images/aman.jpg";
    return (
      <>
        <img style={{ width: "200px" }} src={source}></img>

        <input type="file" onChange={this.handleonchange} />
        <h1>
          {"D:Web ProjectsProjectsWeConnectpropics" +
            localStorage.getItem("imageurl")}
        </h1>
        {/* upload Image */}
        {/* </input> */}
        <button onClick={() => this.handleupload()}>UPLOAD</button>
        <img src={source} />
      </>
    );
  }
}

export default Update;
