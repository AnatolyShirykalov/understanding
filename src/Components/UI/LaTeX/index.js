import React, { Component } from "react";
import MathJax from "~/vendor/react-mathjax/src";
import classNames from "classnames";
import classes from "./index.css";

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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps === this.props && nextState === this.state) return false;
    return true;
  }

  componentDidUpdate() {
    if (this.state.rendering) return;
    if (this.props.onDidUpdate) this.props.onDidUpdate(this.wrap);
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
      <div
        ref={c => (this.wrap = c)}
        className={classNames(this.props.className, {
          [classes.Inline]: this.props.inline
        })}
        onClick={this.props.onClick}
      >
        <MathJax.Context inline={this.props.inline}>
          <MathJax.Node onRender={this.latexOnRender}>
            {this.state.children}
          </MathJax.Node>
        </MathJax.Context>
      </div>
    );
  }
}
