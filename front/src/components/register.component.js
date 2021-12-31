import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ce champs est obligatoire!
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce n'est pas un email valide.
      </div>
    );
  }
};

const vfirstName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        le prénom doit comporter au moins 3 caractères.
      </div>
    );
  }
};

const vlastName = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        le nom doit comporter au moins 3 caractères.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        le mot de passe doit contenir entre 6 et 40 caractères
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      firstName: "",
      email: "",
      password: "",
      successful: false,
      lastName: "",
      imgSrc: "//ssl.gstatic.com/accounts/ui/avatar_2x.png",
    };
    this.data = new FormData()
  }

  onChangeFirstName(e) {
    
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    
    this.setState({
      lastName: e.target.value,
    });
  }
  onChangeAvatar(e) {
    const file = e.target.files[0];
    
    this.data.append("image",file)
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

  onChangeEmail(e) {
    
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
   
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    
    this.form.validateAll();
    this.data.append("firstName", this.state.firstName)
    this.data.append("lastName", this.state.lastName)
    this.data.append("email", this.state.email)
    this.data.append("password", this.state.password)

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.data)
        )
        .then(() => {
          this.data=new FormData()
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
            encType="multipart/form-data"
          >
            <label htmlFor="avatar" className="profile-img">
              <img
                src={`${this.state.imgSrc}`}
                alt="profile-img"
                className="profile-img-card"
              />
              <Input
                type="file"
                id="avatar"
                className="input-file-avatar"
                name="avatar"
                value={this.state.avatar}
                onChange={this.onChangeAvatar}
                ref={this.fileInput}
               
              />
            </label>

            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="firstName">Prénom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, vfirstName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Nom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, vlastName]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Créer</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
