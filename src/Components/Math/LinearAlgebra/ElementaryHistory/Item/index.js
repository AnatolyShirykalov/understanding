import React, { Component } from "react";
import classes from "./index.css";
import MatrixPair from "../../MatrixPair";
import classnames from "classnames";
import LaTeX from "~/Components/UI/LaTeX";
class Item extends Component {
  state = {
    expand: true
  };
  toggle = () => {
    this.setState({ expand: !this.state.expand });
  };
  transforms() {
    return this.props.item.transforms
      .map((t, i) => ({ ...t, i }))
      .filter(
        ({ multiplicator }) =>
          multiplicator && multiplicator !== "" && multiplicator !== "0"
      );
  }
  render() {
    const btnClass = classnames([
      classes.Btn,
      {
        [classes.HideBtn]: this.state.expand,
        [classes.ShowBtn]: !this.state.expand
      }
    ]);
    const btnText = this.state.expand ? "Свернуть" : "Развернуть";
    return (
      <div className={classes.Item}>
        <button className={btnClass} onClick={this.toggle}>
          {btnText}
        </button>
        <button
          className={classnames(classes.Undo)}
          onClick={this.props.onClick}
        >
          Откатиться
        </button>
        <div className={classnames({ [classes.Hide]: !this.state.expand })}>
          <MatrixPair matrices={this.props.item.matrices} />
          {this.transforms().map((t, i) => (
            <div key={i}>
              <LaTeX className={classes.Latex} key={i}>
                {this.props.prettyTransform(t.i, t)}
              </LaTeX>
            </div>
          ))}
          {this.transforms().map((t, i) => (
            <div key={i}>{this.props.expandedTransform(t.i, t)}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Item;
