import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";
import AddPost from '../services/user-post';
import {toast} from "react-toastify";

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
    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      title: "",
      content: "",
      loading: false,
      message: "",
      selectedFile: null,
      loaded:0,
      currentUser:AuthService.getCurrentUser()
    };
  }

  checkMimeType = (event) => {
    let files = event.target.files
    let err = []
    const types = ['image/png', 'image/jpeg', 'image/gif']

    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container
         err[x] = files[x].type+' is not a supported format\n';
       }
     }

    for(var z = 0; z<err.length; z++) {// if message not same old that mean has error
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }

    return true;
  }

  maxSelectFile = (event) => {
    let files = event.target.files
        if (files.length > 3) {
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null
           toast.warn(msg)
           return false;
      }
    return true;
 }

 checkFileSize = (event) => {
  let files = event.target.files
  let size = 2000000
  let err = [];
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
}
for(var z = 0; z<err.length; z++) {// if message not same old that mean has error
  // discard selected file
 toast.error(err[z])
 event.target.value = null
}
return true;
}

  onFileChange = event => {
    let files = event.target.files
  if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){
  // if return true allow to setState
     this.setState({
     selectedFile: files,
     loaded:0
  })}
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

    //this.form.validateAll();
    const data = new FormData(e.target)

    if (this.checkBtn.context._errors.length === 0) {
        console.log(this.state.selectedFile[0])
        console.log(data.get("img"))


      AddPost.addpost(this.state.title, this.state.content, this.state.currentUser.username,data.get("img")).then(
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
              encType="multipart/form-data"
            onSubmit={this.handleAddingPost}
            ref={c => {
              this.form = c;
            }}>
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
              <input type="file" id="file" name='img' className="form-control" multiple onChange={this.onFileChange}/>
            </div>


            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}>
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