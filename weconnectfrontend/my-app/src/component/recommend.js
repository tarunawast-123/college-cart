import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "react-bootstrap/Card";

export class recommend extends Component {
    componentDidMount(){
        let username=localStorage.getItem('username');
        fetch('https://localhost:8384/api/users',
         headers:{
             Auth
         }
        )
    }
    render() {
    return (
      <div>
        <Card>
          <CardBody></CardBody>
        </Card>
      </div>
    );
  }
}

export default recommend;
