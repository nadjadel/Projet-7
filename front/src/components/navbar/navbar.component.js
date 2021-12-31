import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import "./navbar.css";

class Navbar extends Component {
  render() {
    const { user: currentUser } = this.props;

    return (
      <nav className="navbar sticky-top navbar-expand navbar-light ">
        <Link to={"/"} className="navbar-brand">
          <img src="/icon.svg" height="40" width="40" alt="logo"/>
          <label className="label">Groupomania</label>
        </Link>
       
        <div className="navbar-nav middlenav">
        <li className="nav-item">
            <div className="input">
              <form>
                <input type="text" className="search" />
                <i className="fa fa-search"></i>
              </form>
            </div>
          </li>
          <div>
            <i className="fa fa-home"></i>
          </div>
          <div>
            <i className="fa fa-group"></i>
          </div>
          <div>
            <i className="fa fa-flag"></i>
          </div>
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto rightnav">
             <li className="nav-item">
             
             <Avatar src={currentUser.user.avatar}/>
            
              
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.user.firstName}
              </Link>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={this.props.logOut}>
                Déconnecter
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto right">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Connecter
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                S'enregistrer
              </Link>
            </li>
          </div>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navbar);
