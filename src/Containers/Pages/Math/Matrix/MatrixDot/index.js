import React, { Component } from "react";
import MatrixDotView from "~/Components/Math/LinearAlgebra/MatrixDot";
import MatrixNewExample from "~/Components/Math/LinearAlgebra/MatrixDot/Generator";
import classes from "./index.css";
export default class MatrixDot extends Component {
  state = {
    m1: [["a", "-b"], ["b", "a"]],
    m2: [["alpha", "-beta"], ["beta", "alpha"]]
  };
  replace = ({ m1, m2 }) => {
    this.setState({ m1, m2, new: false });
  };

  toggle = () => {
    this.setState({ new: !this.state.new });
  };
  render() {
    return (
      <div>
        <button className={classes.Btn} onClick={this.toggle}>
          Другое задание
        </button>
        {this.state.new ? <MatrixNewExample submit={this.replace} /> : null}
        <MatrixDotView m1={this.state.m1} m2={this.state.m2} />
      </div>
    );
  }
}
