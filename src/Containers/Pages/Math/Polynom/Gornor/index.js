import React, { Component } from "react";
import Gornor from "~/Components/Math/Polynom/Gornor";

export default class GornorPage extends Component {
  render() {
    return (
      <div>
        <h2>Схема Горнора</h2>
        <Gornor coeffs={[1, 1, 3]} expectedRoot={1} />
      </div>
    );
  }
}
