import React, { Component } from "react";
import MathJax from "~/vendor/react-mathjax/src";

export default class LaTeX extends Component {
  state = {
    children: this.props.children,
    nextChildren: null,
    rendering: true
  };

  componentWillReceiveProps(props) {
    const last = this.state.nextChildren || this.state.children;
    if (last === props.children) return;
    if (this.state.rendering) {
      this.setState({
        nextChildren: props.children
      });
    } else {
      this.setState({
        nextChildren: null,
        children: props.children,
        rendering: true
      });
    }
  }

  latexOnRender = () => {
    if (this.state.nextChildren) {
      this.setState({
        children: this.state.nextChildren,
        nextChildren: null,
        rendering: true
      });
    } else {
      this.setState({ rendering: false });
    }
  };

  render() {
    return (
      <div className={this.props.className}>
        <MathJax.Context inline={this.props.inline}>
          <MathJax.Node onRender={this.latexOnRender}>
            {this.state.children}
          </MathJax.Node>
        </MathJax.Context>
      </div>
    );
  }
}
