import React, { Component } from "react";
import classes from "./index.css";
import Form from "~/Components/Math/Polynom/Form";
import Polynom from "~/Components/Math/Polynom";

export default class PolynomPrimeComponent extends Component {
  render() {
    return (
      <div>
        <p>Полином прайм</p>
        <Polynom roots={this.props.roots} />
        <Form submitText="Проверить" />
      </div>
    );
  }
}
