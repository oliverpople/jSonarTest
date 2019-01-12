import React, { Component } from "react";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: this.props.orderDetails[0].orderNumber,
      orderDate: this.props.orderDetails[0].orderDate,
      requiredDate: this.props.orderDetails[0].requiredDate,
      shippedDate: this.props.orderDetails[0].shippedDate,
      status: this.props.orderDetails[0].status,
      comments: this.props.orderDetails[0].comments,
      customerNumber: this.props.orderDetails[0].customerNumber
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        Order Number: {this.state.orderNumber}
        Order Date: {this.state.orderDate}
        Required Date: {this.state.requiredDate}
        Shipped Date: {this.state.shippedDate}
        Status: {this.state.status}
        Comments: {this.state.comments}
        CustomerNumber: {this.state.customerNumber}
      </div>
    );
  }
}
export default Order;
