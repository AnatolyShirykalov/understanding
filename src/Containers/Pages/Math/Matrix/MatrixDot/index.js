import React, { Component } from "react";
import MatrixDotView from "~/Components/Math/LinearAlgebra/MatrixDot";

export default class MatrixDot extends Component {
  state = {
    m1: [[1, 2], [3, 4]],
    m2: [[-1, 1], [2, -1]]
  };
  render() {
    return (
      <div>
        <MatrixDotView m1={this.state.m1} m2={this.state.m2} />
      </div>
    );
  }
}
