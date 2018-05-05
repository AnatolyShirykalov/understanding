import React, { Component } from "react";
import MatrixDetView from "~/Components/Math/LinearAlgebra/MatrixDet";
import NewExample from "~/Components/UI/NewExample";
import MatrixForm from "~/Components/Math/LinearAlgebra/Matrix/Form";
import MatrixSelect from "~/Components/Math/LinearAlgebra/Matrix/Select";
import { genMatrix, NerdMatrix, Scalar } from "~/core/math/linearAlgebra";

export default class MatrixDet extends Component {
  state = {
    matrix: [[1, 0], [0, 1]]
  };
  set = matrix => {
    this.setState({ matrix, right: false });
  };
  gen = () => {
    this.setState({
      matrix: genMatrix({ square: true, maxN: 5, minN: 2 }),
      right: false
    });
  };
  check = ans => {
    if (new NerdMatrix(this.state.matrix).det().isEqual(new Scalar(ans))) {
      this.setState({ right: true });
    }
  };
  render() {
    return (
      <div>
        <h2>Определитель матрицы</h2>
        <NewExample
          gen={this.gen}
          set={this.set}
          selectComponent={MatrixSelect}
          formComponent={MatrixForm}
        />
        <MatrixDetView
          matrix={this.state.matrix}
          right={this.state.right}
          submit={this.check}
        />
      </div>
    );
  }
}
