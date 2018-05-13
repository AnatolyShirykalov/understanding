import React, { Component } from "react";

export default class EInput extends Component {
  focus = () => {
    if (+this.props.value !== 0) return;
    this.props.onChange({ target: { value: "" } });
  };
  blur = () => {
    if (this.props.value !== "") return;
    this.props.onChange({ target: { value: "0" } });
  };
  render() {
    return (
      <input
        className={this.props.className}
        style={this.props.style}
        value={this.props.value}
        onChange={this.props.onChange}
        onFocus={this.focus}
        onBlur={this.blur}
      />
    );
  }
}
