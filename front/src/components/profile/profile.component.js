import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AuthService from "../../services/auth.service";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import "./profile.css";
import authService from "../../services/auth.service";
import { isActive } from "../../actions/auth";
import { getPost } from "../../actions/post";

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user: currentUser } = this.props;
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeAttributes = this.handleChangeAttributes.bind(this);
    this.handleSuspendAccount = this.handleSuspendAccount.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);
    this.data = new FormData();
    this.state = {
      userId: currentUser.userId,
      firstName: currentUser.user.firstName,
      email: currentUser.user.email,
      lastName: currentUser.user.lastName,
      password: "",
      open: false,
      confirm: false,
      isActive:currentUser.isActive
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChangePassword() {
    const updatedPassword = {
      id: this.state.userId,
      password: this.state.password,
    };
    AuthService.update(updatedPassword);
    this.setState({ open: false, password: "" });
  }

  handleChangeAttributes() {
    const updatedPassword = {
      id: this.state.userId,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };
    AuthService.update(updatedPassword);
  }

  handleConfirm(validated) {
    let action;
    if (this.props.user.isActive) {
      action = false;
    } else {
      action = true;
    }
    if (validated) {
     this.props.dispatch(isActive(this.props.user.userId, action))
     this.props.dispatch(getPost())
     
    } 
    this.setState({ confirm: false });
    
  }
  handleSuspendAccount() {
    this.setState({ confirm: true });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangeAvatar(e) {
    const file = e.target.files[0];

    this.data.append("image", file);
    this.readURL(file).then((res) => {
      this.setState({
        imgSrc: res,
      });
    });
  }

  readURL = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  };

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>changer de mot de passe</DialogTitle>
          <DialogContent>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Annuler</Button>
            <Button onClick={this.handleChangePassword}>valider</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.confirm} onClose={this.handleClose}>
          <DialogContent>Etes vous sur?</DialogContent>
          <DialogActions>
            <button onClick={() => this.handleConfirm(true)}>Oui</button>
            <button onClick={() => this.handleConfirm(false)}>Non</button>
          </DialogActions>
        </Dialog>
        <div className="left-profile">
          <img
            src={
              currentUser.user.avatar ||
              "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            }
            className="profile-img-card"
            alt="avatar"
          />

          <h3>
            <strong>
              {currentUser.user.firstName + " " + currentUser.user.lastName}
            </strong>
          </h3>
        </div>
        <div className="right-profile">
          {currentUser.user.roles ? (
            <p>
              <strong>Role:</strong> {currentUser.user.roles}
            </p>
          ) : (
            <p>
              <strong>Role:</strong>
              <label>Utilisateur</label>
            </p>
          )}

          <p>
            <strong>Email:</strong>
            <input
              type="text"
              onChange={this.onChangeEmail}
              value={`${this.state.email}`}
            />
          </p>
          <p>
            <strong>Prénom:</strong>{" "}
            <input
              type="text"
              onChange={this.onChangeLastName}
              value={`${this.state.firstName}`}
            />
          </p>
          <p>
            <strong>Nom:</strong>{" "}
            <input
              type="text"
              onChange={this.onChangeFirstName}
              value={`${this.state.lastName}`}
            />
          </p>
          <div className="button">
            <div>
              <button
                className="btn primary"
                onClick={this.handleChangeAttributes}
              >
                modifier attributs
              </button>
            </div>
            <div>
              <button className="btn primary" onClick={this.handleClickOpen}>
                modifier mot de passe
              </button>
            </div>
            <div>
              {this.props.user.isActive ? (
                <button
                  className="btn secondary"
                  onClick={this.handleSuspendAccount}
                >
                  Suspendre Compte
                </button>
              ) : (
                <button
                  className="btn success"
                  onClick={this.handleSuspendAccount}
                >
                  Ré activer Compte
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
