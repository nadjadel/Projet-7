import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import Navbar from "./components/navbar/navbar.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";
import {RouteProtected} from "./common/protected-routes"
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
     
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

 
  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    } 

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
     
      currentUser: undefined,
    });
  }
  
  render() {
   
    return (
      <Router history={history}>
        <div>
          <Navbar logOut={this.logOut}/>
        

          <div className="mt-3">
        
            <Switch>
            <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <RouteProtected  path="/profile" component={Profile} />
              <RouteProtected  path= "/home" component={Home} />
              <RouteProtected  path= "/" component={Home} />
              
            </Switch>
           
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
