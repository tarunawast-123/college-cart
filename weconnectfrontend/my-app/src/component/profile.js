import React, { Component } from "react";
import { Link } from "react-router-dom";
import ExampleComponent from "react-rounded-image";
const styles = {
  transition: "all .3s ease-out",
};
export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageurl: "",
      scale: "1",
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:8384/api/users?username=${localStorage.getItem(
        "username"
      )}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((user) => user.json())
      .then((user) => {
        this.setState({ imageurl: user.imageurl });
      });
    this.render();
  }
  render() {
    // console.log("HI");
    console.log(this.state.imageurl);
    var source = "";
    if (this.state.imageurl != null && this.state.imageurl != "")
      source = require(`../images/${this.state.imageurl}`);
    const src =
      "D:/Web Projects/Projects/weconnectfrontend/my-app/src/images/bg.jpg"; // +
    //this.state.imageurl;
    console.log(source);
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            //  marginTop: "2rem",
            //    zIndex: "3",

            width: "1080px",
            position: "absolute",
            //   zIndex: "1",
            backgroundColor: "#b90066",
            height: "700px",
            /* Center and scale the image nicely */
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          onMouseEnter={async () => {
            console.log(this.state.scale);
            await this.setState({
              scale: "1.5",
            });
            console.log(this.state.scale);
          }}
          onMouseLeave={async () => {
            {
              console.log(this.state.scale);
              this.setState({ val: "shadow" });
              await this.setState({
                scale: "1.0",
              });
              console.log(this.state.scale);
            }
          }}
          style={{
            position: "absolute",
            // marginTop: "2rem",
            //  position: "fixed",
            // zIndex: "1",
            height: "200px",
            width: "1080px",
            zIndex: "30",
            ...styles,
            transform: "scaleY(" + this.state.scale + ")",
            backgroundColor: "black",
            height: "150px",
            /* Center and scale the image nicely */
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          onMouseEnter={async () => {
            console.log(this.state.scale);
            await this.setState({
              scale: "1.5",
            });
            console.log(this.state.scale);
          }}
          onMouseLeave={async () => {
            {
              console.log(this.state.scale);
              this.setState({ val: "shadow" });
              await this.setState({
                scale: "1.0",
              });
            }
          }}
          style={{ marginLeft: "16rem", zIndex: "40", position: "absolute" }}
        >
          <div
            onMouseEnter={async () => {
              await this.setState({
                scale: "1.5",
              });
            }}
            onMouseLeave={async () => {
              {
                this.setState({ val: "shadow" });
                await this.setState({
                  scale: "1.0",
                });
              }
            }}
            style={{
              display: "table-row",
            }}
            className="table-row"
          >
            <ExampleComponent
              onMouseEnter={async () => {
                await this.setState({
                  scale: "1.5",
                });
              }}
              onMouseLeave={async () => {
                {
                  this.setState({ val: "shadow" });
                  await this.setState({
                    scale: "1.0",
                  });
                }
              }}
              className="table-cell"
              image={source}
              roundedColor="#321124"
              imageWidth="120"
              imageHeight="120"
              roundedSize="2"
              style={{
                display: "table-cell",
              }}
            ></ExampleComponent>

            <Link
              onMouseEnter={async () => {
                console.log(this.state.scale);
                await this.setState({
                  scale: "1.5",
                });
                console.log(this.state.scale);
              }}
              onMouseLeave={async () => {
                {
                  console.log(this.state.scale);
                  this.setState({ val: "shadow" });
                  await this.setState({
                    scale: "1.0",
                  });
                  console.log(this.state.scale);
                }
              }}
              //  className="table-cell"
              style={{
                display: "table-cell",
                color: "white",
                fontSize: "1.0rem",
                fontStyle: "italic",
              }}
              to="./updateprofile"
            >
              Update Profile
            </Link>
          </div>
          {/* <img src={source}></img> */}

          <h1
            onMouseEnter={async () => {
              console.log(this.state.scale);
              await this.setState({
                scale: "1.5",
              });
              console.log(this.state.scale);
            }}
            onMouseLeave={async () => {
              {
                console.log(this.state.scale);
                this.setState({ val: "shadow" });
                await this.setState({
                  scale: "1.0",
                });
                console.log(this.state.scale);
              }
            }}
            style={{
              color: "white",
              ...styles,
              transform: "scaleY(" + 1 + ")",
            }}
          >
            {localStorage.getItem("username").toLocaleUpperCase()}{" "}
          </h1>

          <ul style={{ position: "relative" }}>
            <li
              style={{
                color: "black",
                fontSize: "1.5rem",
                // fontStyle: "italic",
                fontFamily: "cursive",
              }}
            >
              Likes-
            </li>
            <li style={{ color: "black", fontSize: "1.5rem" }}>
              <Link
                to="./myposts"
                style={{
                  display: "table-cell",
                  color: "black",
                  fontSize: "1.5rem",
                  fontFamily: "cursive",
                }}
              >
                Posts
              </Link>
            </li>{" "}
            <li
              style={{
                fontFamily: "cursive",
                // fontStyle: "italic",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Github-
            </li>
            <li
              style={{
                fontFamily: "cursive",
                // fontStyle: "italic",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Facebook-
            </li>
            <li
              style={{
                fontFamily: "cursive",
                // fontStyle: "italic",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Twitter-
            </li>
            <li
              style={{
                fontFamily: "cursive",
                // fontStyle: "italic",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Following-
            </li>
            <li
              style={{
                fontFamily: "cursive",
                // fontStyle: "italic",
                color: "black",
                fontSize: "1.5rem",
              }}
            >
              Followers-
            </li>
          </ul>
        </div>{" "}
        {/* <div style={{ position: "absolute", zIndex: "1" }}>bottom</div> */}
        {/* <div style={{ position: "absolute", zIndex: "2" }}>top</div> */}
      </div>
    );
  }
}

export default Profile;
