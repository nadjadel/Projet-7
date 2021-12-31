import React, { Component } from "react";
import "./post.css";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
// Icons
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ThumbUp,
  ChatBubbleOutline,
  Share,
  DeleteForever,
  MoreVert,
  Flag,
  PersonAdd,
} from "@material-ui/icons";
import userService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getPost } from "../../actions/post";
import { getContacts } from "../../actions/contact";
import IconButton from "@material-ui/core/IconButton";

class Post extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFlag = this.handleFlag.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.getIndex = this.props.posts.findIndex(
      (x) => x.id === this.props.post.id
    );
    this.devRef = React.createRef();
    this.state = {
      anchorEl: this.devRef.current,
      open: false,
      like: "",
      likeId: null,
      likesNumber: this.props.post.likes.length,
      commentNumber:this.props.post.comments.length
    };
  }

  handleLike() {
    if (this.state.like === "") {
      userService
        .addLike({
          postId: this.props.post.id,
          userId: this.props.user.userId,
        })
        .then((res) => {
          this.props.dispatch(getPost());
          this.setState({
            like: "liked",
          });
        });
    } else {
      userService.deleteLike(this.state.likeId).then((res) => {
        this.props.dispatch(getPost());
        this.setState({
          like: "",
        });
      });
    }
  }

  handleAddFriend() {
    const contact = {
      userId: this.props.user.userId,
      contactId: this.props.post.userId.id,
    };
    AuthService.addContact(contact)
      this.props.dispatch(getContacts(this.props.user.userId));
   
  }

  handleComment() {}

  handleDelete = () => {
    userService.deletePost(this.props.post.id);
    this.props.dispatch(getPost());
  };

  componentDidMount() {
    let userHasLiked = this.props.post.likes.find((x) => {
      return x.userId.id === this.props.user.userId;
    });

    if (userHasLiked) {
      this.setState({ like: "liked", likeId: userHasLiked.id });
    }
  }

  handleFlag() {}

  handleShare() {}

  handleClick = () => {
    this.setState({
      anchorEl: this.devRef.current,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <div className="post">
        <div className="postTop">
          <Avatar
            src={this.props.post.userId.imageUrl}
            className="postAvatar"
          />

          <div className="postTopInfo">
            <h3>
              {this.props.post.userId.firstName +
                " " +
                this.props.post.userId.lastName.substring(0, 1)}
            </h3>
            <p>{new Date(this.props.post.date).toUTCString()}</p>
          </div>
        </div>

        <div className="postBottom">
          <LinkPreview
            url={this.props.post.message}
            fallback={this.props.post.message}
          />
        </div>

        <div className="postImage">
          <img src={this.props.post.fileUrl} alt="" />
        </div>

        <div className="postOptions">
          <div className="postOption">
            <ThumbUp onClick={this.handleLike} className={this.state.like} />
            <p className="label">
              {this.props.posts[this.getIndex].likes.length} Like
              {this.props.posts[this.getIndex].likes.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="postOption">
            <ChatBubbleOutline onClick={this.handleComment} />
            <p className="label">
              {this.props.posts[this.getIndex].comments.length} Comment
              {this.props.posts[this.getIndex].comments.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="postOption">
            <Share onClick={this.handleShare} />
            <p className="label">partager</p>
          </div>

          <div className="postOption" ref={this.devRef}>
            <IconButton
              onClick={this.handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={this.state.open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
            >
              <MoreVert />
            </IconButton>

            <Menu
              anchorEl={this.state.anchorEl}
              id="account-menu"
              open={this.state.open}
              onClose={this.handleClose}
              onClick={this.handleClose}
            >
              {this.props.user.userId === this.props.post.userId.id ||
              this.props.user.user.roles === "ROLE_ADMIN" ? (
                <MenuItem
                  key={this.props.post.id + "1"}
                  onClick={this.handleDelete}
                  className="list-group-item list-group-item-light"
                >
                  <DeleteForever />
                  Supprimer
                </MenuItem>
              ) : (
                <div></div>
              )}
              <MenuItem
                key={this.props.post.id + "2"}
                onClick={this.handleFlag}
                className="list-group-item list-group-item-light"
              >
                <Flag />
                Suivre
              </MenuItem>
              {this.props.user.userId !== this.props.post.userId.id ? (
                <MenuItem
                  key={this.props.post.id + "3"}
                  onClick={this.handleAddFriend}
                  className="list-group-item list-group-item-light"
                >
                  <PersonAdd />
                  Ajouter contact
                </MenuItem>
              ) : (
                <div></div>
              )}
            </Menu>
          </div>
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

export default connect(mapStateToProps)(Post);
