import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Order from "./Order.js";
import { Card, List, ListItemText, ListItem } from "@material-ui/core";
var apiBaseUrl = "http://localhost:4000/api/";

const style = {
  margin: 15
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNames: [],
      nameForFilter: [],
      rawCustomerInfoData: [],
      customerNumbers: [],
      selectedCustomerOrdersArray: []
    };
    this.getCustomerIdentityData = this.getCustomerIdentityData.bind(this);
    this.listCustomerNames = this.listCustomerNames.bind(this);
    this.cleanCustomerNameData = this.cleanCustomerNameData.bind(this);
    this.cleanCustomerNumberData = this.cleanCustomerNumberData.bind(this);
    this.handleCustomerClick = this.handleCustomerClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.listSelectedCustomerOrders = this.listSelectedCustomerOrders.bind(
      this
    );
    this.cleanRawCustomerInfoData = this.cleanRawCustomerInfoData.bind(this);
  }

  componentDidMount() {
    this.getCustomerIdentityData();
  }

  async getCustomerIdentityData() {
    const res = await axios.get(apiBaseUrl + "customernames");
    const rawCustomerIdentityData = await res.data.customerIdData;
    var cleanNameData = this.cleanCustomerNameData(rawCustomerIdentityData);
    var cleanCustomerNumberData = this.cleanCustomerNumberData(
      rawCustomerIdentityData
    );
    this.setState({ customerNames: cleanNameData });
    this.setState({ customerNumbers: cleanCustomerNumberData });
    if (res.data.code === 200) {
      console.log("Customer names successfully recieved");
    } else {
      console.log("Customer names is unavailable");
      alert("Customer data is unavailable");
    }
  }

  cleanCustomerNameData(rawCustomerIdentityData) {
    var cleanCustomerNameArray = [];
    for (var i = 0; i < rawCustomerIdentityData.length; i++) {
      cleanCustomerNameArray.push(rawCustomerIdentityData[i].customername);
    }
    return cleanCustomerNameArray;
  }

  //DRY up remove duplication
  cleanCustomerNumberData(rawCustomerIdentityData) {
    var cleanCustomerNumberArray = [];
    for (var i = 0; i < rawCustomerIdentityData.length; i++) {
      cleanCustomerNumberArray.push(rawCustomerIdentityData[i].customernumber);
    }
    return cleanCustomerNumberArray;
  }

  listCustomerNames() {
    const customerNames = this.state.customerNames;
    const listNames = customerNames.map((name, index) => (
      <ListItem button key={index}>
        <ListItemText
          primary={name}
          onClick={event => this.handleCustomerClick({ index })}
        />
      </ListItem>
    ));
    return <List>{listNames}</List>;
  }

  async handleFilter(event) {
    var payload = {
      nameForFilter: this.state.nameForFilter
    };
    const res = await axios.post(apiBaseUrl + "customerfilter", payload);
    const rawFilteredNameData = await res.data.customerNameData;
    var cleanFilteredNamedata = this.cleanCustomerNameData(rawFilteredNameData);
    this.setState({ customerNames: cleanFilteredNamedata });
    console.log(res.data.customerNameData[0].customername);
    if (res.data.code === 200) {
      console.log("Filter successfull");
    } else {
      console.log("Filter unsuccessfull");
      alert("Filter unsuccessfull");
    }
  }

  async handleCustomerClick(event) {
    var self = this;
    var customerNumberForInfoReq = this.state.customerNumbers[event.index];
    var payload = {
      customerNumberForInfoReq: customerNumberForInfoReq
    };

    axios
      .post(apiBaseUrl + "customerorderinfo", payload)
      .then(res => {
        this.setState({ rawCustomerInfoData: res.data.customerInfoData });
        if (this.state.rawCustomerInfoData.length >= 1) {
          var cleanRawCustomerInfoData = self.cleanRawCustomerInfoData(
            this.state.rawCustomerInfoData
          );
          this.setState({
            selectedCustomerOrdersArray: cleanRawCustomerInfoData
          });
        } else {
          console.log("Customer has no Orders");
          alert("Customer has no Orders");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  cleanRawCustomerInfoData(rawCustomerInfoData) {
    var allSelectedCustomerOrdersArray = [];
    var orderSubArray = [];
    var previousOrderNumber = rawCustomerInfoData[0].orderNumber;
    for (var i = 0; i < rawCustomerInfoData.length; i++) {
      if (rawCustomerInfoData[i].orderNumber === previousOrderNumber) {
        orderSubArray.push(rawCustomerInfoData[i]);
        if (i === rawCustomerInfoData.length - 1) {
          allSelectedCustomerOrdersArray.push(orderSubArray);
        }
      } else if (rawCustomerInfoData[i].orderNumber !== previousOrderNumber) {
        allSelectedCustomerOrdersArray.push(orderSubArray);
        var orderSubArray = [];
        var previousOrderNumber = rawCustomerInfoData[i].orderNumber;
        orderSubArray.push(rawCustomerInfoData[i]);
        if (i === rawCustomerInfoData.length - 1) {
          allSelectedCustomerOrdersArray.push(orderSubArray);
        }
      }
    }
    return allSelectedCustomerOrdersArray;
  }

  listSelectedCustomerOrders() {
    var selectedCustomerOrdersArray = this.state.selectedCustomerOrdersArray;
    for (var i = 0; i < selectedCustomerOrdersArray.length; i++) {
      var listOrders = selectedCustomerOrdersArray.map(
        (orderDetails, index) => (
          <li key={orderDetails[0].orderNumber}>
            <Order orderDetails={orderDetails} />
          </li>
        )
      );
      return <ul>{listOrders}</ul>;
    }
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar title="Data Discovery Page" />
          <div>
            <TextField
              hintText="Search Name"
              floatingLabelText="Search Name"
              onChange={(event, newValue) =>
                this.setState({ nameForFilter: newValue })
              }
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleFilter(event)}
            />
          </div>
        </MuiThemeProvider>
        <div className={"name-list-container"}>
          <Card className={"name-list"}>
            <div>{this.listCustomerNames()}</div>
          </Card>
        </div>
        <div>{this.listSelectedCustomerOrders()}</div>
      </div>
    );
  }
}

export default App;
