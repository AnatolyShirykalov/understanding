import React, { Component } from "react";
import { Scalar } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";
import Elementary from "~/Containers/Pages/Math/Matrix/Elementary";
import SaveMatrix from "~/Components/UI/Buttons/SaveMatrix";
import classes from "./index.css";
import Matrix from "~/Components/Math/LinearAlgebra/Matrix";
export default class MatrixDotView extends Component {
  state = {
    value: "",
    elementary: false
  };
  toggle = () => {
    this.setState({ elementary: !this.state.elementary });
  };
  change = e => {
    this.setState({ value: e.target.value });
  };
  submit = () => {
    if (!this.props.submit) return;
    this.props.submit(this.state.value);
  };
  preview = () => {
    try {
      return new Scalar(this.state.value).latex();
    } catch (err) {
      return err.message;
    }
  };
  render() {
    return (
      <div>
        <LaTeX inline>{"\\det"}</LaTeX>
        <Matrix matrix={this.props.matrix} inline />
        <LaTeX inline>{"=?"}</LaTeX>
        <div className={classes.Pair}>
          <input value={this.state.value} onChange={this.change} />
          <LaTeX className={classes.Preview}>{this.preview()}</LaTeX>
        </div>
        <div>
          {this.props.right ? (
            <span>Верно</span>
          ) : (
            <button
              className={classes.Submit}
              onClick={this.submit}
              disabled={this.state.value === ""}
            >
              Проверить
            </button>
          )}
          <SaveMatrix matrix={this.props.matrix} />
        </div>
        <div>
          <button className={classes.Elementary} onClick={this.toggle}>
            Элементарные преобразования
          </button>
          {this.state.elementary ? (
            <Elementary matrix={this.props.matrix} />
          ) : null}
        </div>
      </div>
    );
  }
}
