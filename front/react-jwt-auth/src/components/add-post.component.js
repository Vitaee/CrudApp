import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";
import AddPost from '../services/user-post';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleAddingPost = this.handleAddingPost.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

    this.state = {
      title: "",
      content: "",
      loading: false,
      message: "",
      currentUser:AuthService.getCurrentUser()
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleAddingPost(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AddPost.addpost(this.state.title, this.state.content, this.state.currentUser.username).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <h4>Please Add Post</h4>
        <div className="card">
          <img
            src="https://www.pngkit.com/png/full/436-4368614_png-file-new-post-icon-png.png"
            alt="profile-img"
            className="img-card"
            style={ {height:200, width:200} }
          />


          <Form
            onSubmit={this.handleAddingPost}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Content</label>
              <textarea
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={this.onChangeContent}

              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Submit</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}