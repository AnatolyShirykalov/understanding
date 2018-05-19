import React, { Component } from "react";
import PolynomPrimeComponent from "~/Components/Math/Polynom/Prime";

export default class PolynomPrime extends Component {
  render() {
    return (
      <div>
        <h2>Разложите многочлен на простые множители</h2>
        <PolynomPrimeComponent roots={[1, 1, 3]} />
      </div>
    );
  }
}
