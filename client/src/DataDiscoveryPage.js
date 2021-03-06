import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Order from "./Order.js";
import { Card, List, ListItemText, ListItem } from "@material-ui/core";
var apiBaseUrl =
  "https://jsonar-test.herokuapp.com/api/" || "http://localhost:4000/api/";

const cardStyle = {
  boxShadow: "0 10px 18px rgba(0,0,0,0.25)"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerNames: [],
      nameForFilter: [],
      rawCustomerInfoData: [],
      customerNumbers: [],
      selectedCustomerOrdersArray: [],
      searchSubmitted: false
    };
    this.getCustomerIdentityData = this.getCustomerIdentityData.bind(this);
    this.listCustomerNames = this.listCustomerNames.bind(this);
    this.cleanCustomerIdentityData = this.cleanCustomerIdentityData.bind(this);
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
    this.setState({ searchSubmitted: false });
    const res = await axios.get(apiBaseUrl + "customernames");
    const rawCustomerIdentityData = await res.data.customerIdData;
    var cleanNameData = this.cleanCustomerIdentityData(rawCustomerIdentityData);
    this.setState({ customerNames: cleanNameData.cleanCustomerNames });
    this.setState({
      customerNumbers: cleanNameData.cleanCustomerNumbers
    });
    if (res.data.code === 200) {
      console.log("Customer names successfully recieved");
    } else {
      console.log("Customer names is unavailable");
      alert("Customer data is unavailable");
    }
  }

  cleanCustomerIdentityData(rawCustomerIdentityData) {
    var cleanCustomerNameArray = [];
    var cleanCustomerNumberArray = [];
    for (var i = 0; i < rawCustomerIdentityData.length; i++) {
      cleanCustomerNameArray.push(rawCustomerIdentityData[i].customername);
      cleanCustomerNumberArray.push(rawCustomerIdentityData[i].customernumber);
    }
    return {
      cleanCustomerNames: cleanCustomerNameArray,
      cleanCustomerNumbers: cleanCustomerNumberArray
    };
  }

  listCustomerNames() {
    const customerNames = this.state.customerNames;
    const listNames = customerNames.map((name, index) => (
      <ListItem button key={index}>
        <ListItemText
          primary={name}
          onClick={event => this.handleCustomerClick({ index }, name)}
        />
      </ListItem>
    ));
    return <List id="names-list">{listNames}</List>;
  }

  async handleFilter(event) {
    this.setState({ searchSubmitted: true });
    var payload = {
      nameForFilter: this.state.nameForFilter
    };
    const res = await axios.post(apiBaseUrl + "customerfilter", payload);
    const rawFilteredNameData = await res.data.customerNameData;
    var cleanFilteredNameData = await this.cleanCustomerIdentityData(
      rawFilteredNameData
    );
    this.setState({ customerNames: cleanFilteredNameData.cleanCustomerNames });
    if (res.data.code === 200) {
      console.log("Filter successfull");
      if (
        this.state.customerNames < 1 ||
        this.state.customerNames === undefined
      ) {
        alert("No matching customer");
      }
    } else {
      console.log("Filter unsuccessfull");
      alert("Filter unsuccessfull");
    }
  }

  async handleCustomerClick(event, name) {
    this.setState({ nameForFilter: name });
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
            <Order
              customerName={this.state.nameForFilter}
              orderDetails={orderDetails}
            />
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
          <AppBar title="Data Discovery Page">
            <a href="https://github.com/oliverpople/jSonarTest/">
              <img
                alt="github"
                src={require("./github-logo-1.png")}
                className="logo"
              />
            </a>
          </AppBar>
        </MuiThemeProvider>
        <div className="search-box-container">
          <MuiThemeProvider>
            <TextField
              id="search-box"
              className="search-box"
              hintText="Search Name"
              floatingLabelText="Search Name"
              onChange={(event, newValue) =>
                this.setState({ nameForFilter: newValue })
              }
            />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <div className="search-button-container">
              <RaisedButton
                id="search-button"
                className="search-button"
                label={this.state.searchSubmitted ? "See List" : "submit"}
                primary={true}
                onClick={
                  this.state.searchSubmitted
                    ? event => this.getCustomerIdentityData()
                    : event => this.handleFilter(event)
                }
              />
            </div>
          </MuiThemeProvider>
        </div>
        <div className={"name-list-container"}>
          <Card style={cardStyle} className={"name-list"}>
            <div>{this.listCustomerNames()}</div>
          </Card>
        </div>
        <div>{this.listSelectedCustomerOrders()}</div>
      </div>
    );
  }
}

export default App;
