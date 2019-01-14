import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Login from "./Login";
import Register from "./Register";

const style = {
  margin: 15
};

class Loginscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginscreen: [],
      loginmessage: "",
      loginButtons: [],
      registerbuttonLabel: "Register",
      isLogin: true
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.notLoggedIn = this.notLoggedIn.bind(this);
  }

  componentWillMount() {
    var loginscreen = [];
    loginscreen.push(
      <Login
        key="login-component"
        parentContext={this}
        appContext={this.props.appContext}
      />
    );
    var loginmessage = "Not registered yet? Register Now";
    var loginButtons = [];
    loginButtons.push(
      <div key="register-button">
        <MuiThemeProvider>
          <div>
            <RaisedButton
              id="register-button"
              label={"Register"}
              primary={true}
              style={style}
              onClick={event => this.handleClick(event, "register")}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage,
      loginButtons: loginButtons
    });
  }

  handleClick(event) {
    console.log("event");
    if (this.state.isLogin) {
      this.isLoggedIn(event);
    } else {
      this.notLoggedIn(event);
    }
  }

  isLoggedIn(event) {
    let loginscreen = [];
    loginscreen.push(
      <Register
        key="register-component"
        parentContext={this}
        appContext={this.props.appContext}
      />
    );
    var loginmessage = "Already registered? Go to Login";
    let loginButtons = [];
    loginButtons.push(
      <div key="login-button">
        <MuiThemeProvider>
          <div>
            <RaisedButton
              label={"Login"}
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage,
      loginButtons: loginButtons,
      isLogin: false
    });
  }

  notLoggedIn(event) {
    let loginscreen = [];
    let loginButtons = [];
    loginButtons.push(
      <div key="register-button">
        <MuiThemeProvider>
          <div>
            <RaisedButton
              label={"Register"}
              primary={true}
              style={style}
              onClick={event => this.handleClick(event, "register")}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
    loginscreen.push(
      <Login
        key="login-component"
        parentContext={this}
        appContext={this.props.appContext}
      />
    );
    var loginmessage = "Not Registered yet? Go to registration";
    this.setState({
      loginscreen: loginscreen,
      loginmessage: loginmessage,
      loginButtons: loginButtons,
      isLogin: true
    });
  }

  render() {
    return (
      <div className="loginscreen" key="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          {this.state.loginButtons}
        </div>
      </div>
    );
  }
}

export default Loginscreen;
