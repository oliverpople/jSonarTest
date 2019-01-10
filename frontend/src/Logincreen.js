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
