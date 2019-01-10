import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
var apiBaseUrl = "http://localhost:4000/api/";
import axios from "axios";
import DataDiscoveryPage from "./DataDiscoveryPage";

const style = {
  margin: 15
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleClick(event) {
    var self = this;
    var payload = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
          var dataScreen = [];
          dataScreen.push(
            <DataDiscoveryPage
              key="Data-Discovery-Page"
              appContext={self.props.appContext}
            />
          );
          self.props.appContext.setState({
            loginPage: [],
            dataScreen: dataScreen
          });
        } else if (response.data.code === 204) {
          console.log("Username password do not match");
          alert(response.data.success);
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="Login" />
        </MuiThemeProvider>
        <MuiThemeProvider key="local-login-Component">
          <div>
            <TextField
              hintText="Enter your username"
              floatingLabelText="username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
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

export default Login;
