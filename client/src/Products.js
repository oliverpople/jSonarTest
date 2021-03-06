import React, { Component } from "react";
import { Card } from "@material-ui/core";

const cardStyle = {
  boxShadow: "0 10px 18px rgba(0,0,0,0.25)"
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MSRP: this.props.productDetails.MSRP,
      buyPrice: this.props.productDetails.buyPrice,
      orderLineNumber: this.props.productDetails.orderLineNumber,
      priceEach: this.props.productDetails.priceEach,
      productCode: this.props.productDetails.productCode,
      productDescription: this.props.productDetails.productDescription,
      productLine: this.props.productDetails.productLine,
      productName: this.props.productDetails.productName,
      productScale: this.props.productDetails.productScale,
      productVendor: this.props.productDetails.productVendor,
      quantityInStock: this.props.productDetails.quantityInStock,
      quantityOrdered: this.props.productDetails.quantityOrdered
    };
  }

  render() {
    return (
      <div className={"products-list-container"}>
        <Card style={cardStyle} className={"products-list"}>
          <ul>
            <li className={"title"}>Product Name: {this.state.productName}</li>
            <li>Product Code: {this.state.productCode}</li>
            <li>MSRP: {this.state.MSRP}</li>
            <li>Buy Price: {this.state.buyPrice}</li>
            <li>Order Line Number: {this.state.orderLineNumber}</li>
            <li>Price Each: {this.state.priceEach}</li>
            <li>Product Description: {this.state.productDescription}</li>
            <li>Product Line: {this.state.productLine}</li>
            <li>Product Scale: {this.state.productScale}</li>
            <li>Product Vendor: {this.state.productVendor}</li>
            <li>Quantity In Stock: {this.state.quantityInStock}</li>
            <li>Quantity Ordered: {this.state.quantityOrdered}</li>
            <br />
          </ul>
        </Card>
      </div>
    );
  }
}
export default Products;
