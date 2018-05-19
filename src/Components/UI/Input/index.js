import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";

export default class Input extends Component {
  focus = () => {
    if (`${this.props.value}` === "0")
      this.props.onChange({ target: { value: "" } });
    if (this.props.onFocus) setTimeout(() => this.props.onFocus(), 0);
  };
  blur = () => {
    if (this.props.value === "") this.props.onChange({ target: { value: 0 } });
    if (this.props.onBlur) setTimeout(() => this.props.onBlur(), 0);
  };
  render() {
    return (
      <DebounceInput
        debounceTimeout={100}
        {...this.props}
        onFocus={this.focus}
        onBlur={this.blur}
      />
    );
  }
}
