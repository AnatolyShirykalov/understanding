import React, { Component } from "react";
import MathJax from "~/vendor/react-mathjax/src";
import classes from "./index.css";

export default class LaTeX extends Component {
  state = { key: 1 };

  render() {
    return (
      <div className={this.props.className}>
        <button
          className={classes.Refresh}
          onClick={() => this.setState({ key: this.state.key + 1 })}
        >
          {"\u21bb"}
        </button>
        <MathJax.Context key={this.state.key}>
          <MathJax.Node>{this.props.children}</MathJax.Node>
        </MathJax.Context>
      </div>
    );
  }
}
