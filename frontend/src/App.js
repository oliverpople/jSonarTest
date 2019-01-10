import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./Loginscreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      dataScreen: []
    };
  }

  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen key="login-screen" appContext={this} />);
    this.setState({
      loginPage: loginPage
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.dataScreen}
      </div>
    );
  }
}

export default App;
