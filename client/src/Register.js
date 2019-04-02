import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import Login from "./Login";

const style = {
  margin: 15
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleClick(event) {
    var apiBaseUrl =
      "https://jsonar-test.herokuapp.com/api/" || "http://localhost:4000/api/";
    var self = this;
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var payload = {
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post(apiBaseUrl + "/register", payload)
        .then(function(response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("registration successfull");
            var loginscreen = [];
            loginscreen.push(
              <Login
                key="login-component"
                parentContext={this}
                appContext={self.props.appContext}
              />
            );
            var loginmessage = "Not Registered yet. Go to registration";
            self.props.parentContext.setState({
              loginscreen: loginscreen,
              loginmessage: loginmessage,
              buttonLabel: "Register",
              isLogin: true
            });
          } else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("Input field value is missing");
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register">
              <a href="https://github.com/oliverpople/jSonarTest/">
                <img
                  alt="github"
                  src={require("./github-logo-1.png")}
                  className="logo"
                />
              </a>
            </AppBar>
            <TextField
              id="register-username-input"
              hintText="Enter your username"
              floatingLabelText="username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              id="register-password-input"
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              id="register-submit"
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;
