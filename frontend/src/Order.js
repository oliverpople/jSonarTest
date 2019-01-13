import React, { Component } from "react";
import Products from "./Products.js";
import { Card } from "@material-ui/core";

const cardStyle = {
  boxShadow: "0 10px 18px rgba(0,0,0,0.25)"
};

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
      customerNumber: this.props.orderDetails[0].customerNumber,
      allOrderDetails: this.props.orderDetails
    };
    this.listSelectedOrderProductDetails = this.listSelectedOrderProductDetails.bind(
      this
    );
  }

  listSelectedOrderProductDetails() {
    var allOrderDetails = this.state.allOrderDetails;
    for (var i = 0; i < allOrderDetails.length; i++) {
      var listProductDetails = allOrderDetails.map((productDetails, index) => (
        <li key={index}>
          <Products key={index} productDetails={productDetails} />
        </li>
      ));
      return <ul>{listProductDetails}</ul>;
    }
  }

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    return (
      <div style={cardStyle} className={"orders-list-container"}>
        <Card className={"orders-list"}>
          <ul>
            <li className={"title"}>Order Number: {this.state.orderNumber}</li>
            <li>Order Date: {this.state.orderDate}</li>
            <li>Required Date: {this.state.requiredDate}</li>
            <li>Shipped Date: {this.state.shippedDate}</li>
            <li>Status: {this.state.status}</li>
            <li>
              Comments:{" "}
              {this.state.comments === null ? "n/a" : this.state.comments}
            </li>
            <li>Customer Number: {this.state.customerNumber}</li>
            <br />
          </ul>
          <div>{this.listSelectedOrderProductDetails()}</div>
        </Card>
      </div>
    );
  }
}
export default Order;
