import React, { Component } from "react";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: "",
      orderDate: "",
      requiredDate: "",
      shippedDate: "",
      status: "",
      comments: "",
      customerNumber: ""
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return <div />;
  }
}
export default Order;
