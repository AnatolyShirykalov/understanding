import React, { Component } from "react";
import MatrixForm from "~/Components/Math/LinearAlgebra/Matrix/Form";
import MatrixSelect from "~/Components/Math/LinearAlgebra/Matrix/Select";
import NewExample from "~/Components/UI/NewExample";
import Matrix from "~/Components/Math/LinearAlgebra/Matrix";
import * as Structures from "~/core/math/linearAlgebra";

export default class MathDotGenerator extends Component {
  state = {};
  set = matrix => {
    if (this.state.m1) {
      this.props.submit({ m1: this.state.m1, m2: matrix });
      return;
    }
    this.setState({ m1: matrix });
  };
  gen = () => {
    if (this.state.m1) {
      const M = this.state.m1[0].length;
      const m2 = Structures.genMatrix({ M });
      this.props.submit({ m1: this.state.m1, m2 });
      return;
    }
    const m1 = Structures.genMatrix({ maxN: 4, minN: 1 });
    this.setState({ m1 });
  };
  remove = () => {
    this.setState({ m1: undefined });
  };
  render() {
    return (
      <div>
        {this.state.m1 ? (
          <div>
            <Matrix matrix={this.state.m1} />
            <button onClick={this.remove}>Удалить</button>
          </div>
        ) : null}
        <NewExample
          formComponent={MatrixForm}
          set={this.set}
          gen={this.gen}
          selectComponent={MatrixSelect}
        />
      </div>
    );
  }
}
