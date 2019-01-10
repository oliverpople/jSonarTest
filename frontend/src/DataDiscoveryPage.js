import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
var apiBaseUrl = "http://localhost:4000/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
    this.getCustomerData = this.getCustomerData.bind(this);
  }

  componentDidMount() {
    this.getCustomerData();
  }

  async getCustomerData() {
    const res = await axios
      .get(apiBaseUrl + "customers")
      .then(function(res) {
        if (res.data.code === 200) {
          console.log("Customer data successfully recieved");
        } else {
          console.log("Customer data is unavailable");
          alert("Customer data is unavailable");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    const customerData = await res.data.customerData;
    this.setState({ customers: customerData });
    console.log(this.state.customers);
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="Data Discovery Page" />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
