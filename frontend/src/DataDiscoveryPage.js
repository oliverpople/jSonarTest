import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
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
      // selectedName: ""
      customerNumbers: []
    };
    this.getCustomerIdentityData = this.getCustomerIdentityData.bind(this);
    this.listCustomerNames = this.listCustomerNames.bind(this);
    this.cleanCustomerNameData = this.cleanCustomerNameData.bind(this);
    this.cleanCustomerNumberData = this.cleanCustomerNumberData.bind(this);
    this.handleCustomerClick = this.handleCustomerClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.getCustomerIdentityData();
  }

  async getCustomerIdentityData() {
    const res = await axios.get(apiBaseUrl + "customernames");
    const rawCustomerIdentityData = await res.data.customerData;
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
    for (var j = 0; j < rawCustomerIdentityData.length; j++) {
      cleanCustomerNameArray.push(rawCustomerIdentityData[j].customername);
    }
    return cleanCustomerNameArray;
  }

  //DRY up remove duplication
  cleanCustomerNumberData(rawCustomerIdentityData) {
    var cleanCustomerNumberArray = [];
    for (var j = 0; j < rawCustomerIdentityData.length; j++) {
      cleanCustomerNumberArray.push(rawCustomerIdentityData[j].customernumber);
    }
    return cleanCustomerNumberArray;
  }

  listCustomerNames() {
    const customerNames = this.state.customerNames;
    const listNames = customerNames.map((name, index) => (
      <li key={index} onClick={event => this.handleCustomerClick({ index })}>
        {name}
      </li>
    ));
    return <ul>{listNames}</ul>;
  }

  async handleCustomerClick(event) {
    var customerNumberForInfoReq = this.state.customerNumbers[event.index];
    var payload = {
      customerNumberForInfoReq: customerNumberForInfoReq
    };
    const res = await axios.post(apiBaseUrl + "customerorderinfo", payload);
    const rawCustomerData = await res.data.customerData;
    // var cleanFilteredNamedata = this.cleanCustomerNameData(rawFilteredNameData);
    // this.setState({ customerNames: cleanFilteredNamedata });
    if (res.data.code === 200) {
      console.log("Customer info successfully received");
    } else {
      console.log("Customer info not received");
      alert("Customer info request unsuccessfull");
    }
  }

  async handleFilter(event) {
    var payload = {
      nameForFilter: this.state.nameForFilter
    };
    const res = await axios.post(apiBaseUrl + "customerfilter", payload);
    const rawFilteredNameData = await res.data.customerData;
    var cleanFilteredNamedata = this.cleanCustomerNameData(rawFilteredNameData);
    this.setState({ customerNames: cleanFilteredNamedata });
    console.log(res.data.customerData[0].customername);
    if (res.data.code === 200) {
      console.log("Filter successfull");
    } else {
      console.log("Filter unsuccessfull");
      alert("Filter unsuccessfull");
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
        <div>{this.listCustomerNames()}</div>
      </div>
    );
  }
}

export default App;
