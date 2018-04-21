import React, { Component } from "react";
import ScalarProductView from "~/Components/Math/LinearAlgebra/Vector/ScalarProduct";
import { genVector } from "~/core/math/linearAlgebra";
import NewExample from "~/Components/UI/NewExample";
export default class ScalarProduct extends Component {
  state = {
    v1: [1, 2, 3],
    v2: [-1, 2, 2]
  };

  right = value => {
    console.log("Молодец", value);
  };

  gen = () => {
    const v1 = genVector();
    const v2 = genVector({ length: v1.length });
    this.setState({ v1, v2 });
  };
  render() {
    return (
      <div>
        <NewExample gen={this.gen} />
        <ScalarProductView
          v1={this.state.v1}
          v2={this.state.v2}
          onRight={this.right}
        />
      </div>
    );
  }
}
