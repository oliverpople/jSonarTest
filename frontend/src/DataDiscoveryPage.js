import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
var apiBaseUrl = "http://localhost:4000/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNameData: [],
      customerNames: []
    };
    this.getCustomerNameData = this.getCustomerNameData.bind(this);
    this.listCustomerNames = this.listCustomerNames.bind(this);
    this.cleanCustomerNameData = this.cleanCustomerNameData.bind(this);
  }

  componentDidMount() {
    this.getCustomerNameData();
  }

  async getCustomerNameData() {
    const res = await axios.get(apiBaseUrl + "customernames");
    const customerNameData = await res.data.customerData;
    this.setState({ customerNameData: customerNameData });
    this.cleanCustomerNameData(customerNameData);
    if (res.data.code === 200) {
      console.log("Customer names successfully recieved");
    } else {
      console.log("Customer names is unavailable");
      alert("Customer data is unavailable");
    }
  }

  cleanCustomerNameData(customerNameData) {
    var customerNameArray = [];
    for (var j = 0; j < customerNameData.length; j++) {
      customerNameArray.push(customerNameData[j].customername);
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
