import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentError, removeCurrentError } from "~/store/actions";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";
import Variables from "~/Components/Math/LinearAlgebra/Variables";

class MatrixDot extends Component {
  state = {
    variables: {
      m1: {
        removable: false,
        type: "NerdMatrix",
        value: new NerdMatrix(this.props.m1)
      },
      m2: {
        removable: false,
        type: "NerdMatrix",
        value: new NerdMatrix(this.props.m2)
      }
    }
  };

  deleteVariable = name => {
    const variables = { ...this.state.variables };
    delete variables[name];
    this.setState({ variables });
  };

  render() {
    const { m1, m2 } = this.state.variables;
    const tex = `${m1.value.latex()}\\cdot ${m2.value.latex()}= ?`;
    return (
      <div>
        <h2>Умножение матриц</h2>
        <LaTeX>{tex}</LaTeX>
        <Variables
          variables={this.state.variables}
          delete={this.deleteVariable}
          use={this.useVariable}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setError: er => dispatch(setCurrentError(er)),
  removeError: () => dispatch(removeCurrentError())
});

export default connect(null, mapDispatchToProps)(MatrixDot);
