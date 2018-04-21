import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentError, removeCurrentError } from "~/store/actions";
import { Scalar, Vector } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";

class ScalarProduct extends Component {
  state = {
    value: ""
  };

  change = e => {
    try {
      new Scalar(e.target.value).data();
      this.props.removeError();
    } catch (error) {
      this.props.setError(error.message);
    }
    this.setState({ value: e.target.value });
  };

  render() {
    const v1 = new Vector(this.props.v1);
    const v2 = new Vector(this.props.v2);
    const tex = `${v1.latex()} \\cdot ${v2.latex()} = ?`;
    const v1v2 = v1.dot(v2);
    try {
      if (
        this.state.value !== "" &&
        v1v2.subtract(new Scalar(this.state.value)).data() === "0" &&
        this.props.onRight
      )
        this.props.onRight(this.state.value);
    } catch (error) {
      if (this.props.onError) {
        this.props.onError(error.message);
      }
    }
    return (
      <div>
        <h2>Скалярное произведение</h2>
        <LaTeX>{tex}</LaTeX>
        <input onChange={this.change} value={this.state.value} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setError: er => dispatch(setCurrentError(er)),
  removeError: () => dispatch(removeCurrentError())
});

export default connect(null, mapDispatchToProps)(ScalarProduct);
