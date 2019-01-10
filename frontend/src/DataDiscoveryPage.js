import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
var apiBaseUrl = "http://localhost:4000/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: [],
      customerNames: []
    };
    this.getCustomerData = this.getCustomerData.bind(this);
    this.listCustomerNames = this.listCustomerNames.bind(this);
    this.getCustomerNames = this.getCustomerNames.bind(this);
  }

  componentDidMount() {
    this.getCustomerData();
  }

  async getCustomerData() {
    const res = await axios.get(apiBaseUrl + "customers");
    const customerData = await res.data.customerData;
    this.setState({ customerData: customerData });
    this.getCustomerNames(customerData);
    if (res.data.code === 200) {
      console.log("Customer data successfully recieved");
    } else {
      console.log("Customer data is unavailable");
      alert("Customer data is unavailable");
    }
  }

  getCustomerNames(customerData) {
    var customerNameArray = [];
    for (var j = 0; j < customerData.length; j++) {
      customerNameArray.push(customerData[j].customerName);
      this.setState({ customerNames: customerNameArray });
    }
  }

  listCustomerNames() {
    const customerNames = this.state.customerNames;
    const listNames = customerNames.map((name, index) => (
      <li key={index}>{name}</li>
    ));
    return <ul>{listNames}</ul>;
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="Data Discovery Page" />
        </MuiThemeProvider>
        <div>{this.listCustomerNames()}</div>
      </div>
    );
  }
}

export default App;
