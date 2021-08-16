import React, { Component } from "react";
import UserService from "../services/user-service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }


  render() {
    return (
      <div className="container">
        {this.state.content.map((item) => (
        <header className="jumbotron">
          <div className="row justify-content-between">
            <h3>{item.title}</h3>
            <h3 className="float-right">Created By: {item.createdBy}</h3>


          </div>
           <hr />


          <h3>Content of Post</h3>
          <br />
          <h4>{item.content}</h4>
          <br />
          <b className="float-right">{item.createdAt.split("T")[0]}</b>

        </header>
        ))}
      </div>
    );
  }
}