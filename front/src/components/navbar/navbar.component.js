import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import "./navbar.css";
import { Search, Home, Group, Flag } from "@material-ui/icons";

class Navbar extends Component {
  render() {
    const { user: currentUser } = this.props;

    return (
      <nav className="navbar sticky-top ">
        
        <Link to={"/home"} className="navbar-brand">
          <img src="icon-left-font-monochrome-white.svg" height="60" width="120" alt="logo"/>
          
        </Link>
       
        <div className="navbar-nav middlenav">
        <ul>
        <li className="nav-item">
            <div >
              <div className="input">
                <input type="text" className="search-input" />
                <Search className="search-icon"/>
              </div>
            </div>
          </li>
          </ul>
          <div>
            <Home className="icon" fontSize="large"/>
          </div>
          <div>
            <Group className="icon" fontSize="large"/>
          </div>
          <div>
            <Flag className="icon" fontSize="large"/>
          </div>
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto rightnav">
            <ul>
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
            </ul>
          </div>
        ) : (
          <div className="navbar-nav ml-auto rightnav">
            <ul>
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
            </ul>
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
