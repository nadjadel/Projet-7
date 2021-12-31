import React, { Component } from "react";
import "./home.css";
import Post from "../post/post.component";
import Side from "../side/side.component";
import { connect } from "react-redux";
import UserService from "../../services/user.service";
import { Avatar } from "@material-ui/core";
import { getPost } from "../../actions/post";
import { getContacts } from "../../actions/contact";
import "font-awesome/css/font-awesome.min.css";
import { AttachFile, Clear } from "@material-ui/icons";
import authService from "../../services/auth.service";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handlePosting = this.handlePosting.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleDeleteContact = this.handleDeleteContact.bind(this);
    this.state = {
      posts: this.props.posts,
      message: "",
      contacts: this.props.contacts,
    };
    this.data = new FormData();
    this.fileInput = React.createRef();
  }
  handlePosting() {
    this.data.append("message", this.state.message);
    this.data.append("userId", this.props.user.userId);
    UserService.addPost(this.data).then((res) => {
      this.props.dispatch(getPost());
      this.data = new FormData();
      this.setState({ message: "" });
    });
  }

  handleDeleteContact(id) {
    console.log(id);
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }

  onChangeFile(e) {
    this.data.append("file", e.target.files[0]);
  }

  componentDidMount() {
    this.props.dispatch(getPost());

    this.props.dispatch(getContacts(this.props.user.userId));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ posts: this.props.posts, contacts: this.props.contacts });
    }
  }
  render() {
    const { user: currentUser } = this.props;
    return (
      <div className="container-home">
        <div className="left-home">
          <Side />
        </div>
        <div className="main-home">
          <h5>Bonjour {currentUser.user.firstName}</h5>
          <br />
          <div className="card post-message">
            <div className="card-header post-message-header">
              <div className="avatar">
                <Avatar src={currentUser.user.avatar} />
              </div>
              <input
                className="on-your-mind"
                name="message"
                placeholder="Qu'avez vous à dire?"
                type="text"
                onChange={this.onChangeMessage}
                value={this.state.message}
              />
            </div>
            <div className="card-body">
              <div>
                <label htmlFor="file" className="profile-img ">
                  <AttachFile className="icon" />
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="input-file-avatar"
                    onChange={this.onChangeFile}
                  />
                  <span className="label">ajouter une pièce jointe</span>{" "}
                </label>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={this.handlePosting}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
          <br />
          <h5>Feed</h5>
          {this.props.posts.map((element) => (
            <div key={element.id} className="card">
              <Post key={element.id} post={element} />
            </div>
          ))}
        </div>
        <div className="feed">
          <h5>Contacts</h5>
          <ul className="contact">
            {this.props.contacts.map((element) => (
              <li key={element.id}>
                <Avatar src={element.contactId.imageUrl} />
                {element.contactId.firstName + " " + element.contactId.lastName}
                <Clear
                  fontSize="small"
                  color="disabled"
                  onClick={() => {
                    authService.deleteContact(element.id).then((res)=>
                    this.props.dispatch(getContacts(this.props.user.userId)))
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { posts } = state.posts;
  const { contacts } = state.contacts;
  return {
    user,
    posts,
    contacts,
  };
}

export default connect(mapStateToProps)(Home);
