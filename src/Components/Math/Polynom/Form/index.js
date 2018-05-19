import React, { Component } from "react";
import LaTeX from "~/Components/UI/LaTeX";
import { Polynom } from "~/core/math/polynoms";
import Input from "~/Components/UI/Input";
import IncDecBtn from "~/Components/UI/Buttons/IncDec";

export default class Form extends Component {
  state = {
    roots: [0, 0]
  };
  submit = () => {
    const os = this.props.onSubmit;
    if (os) os(this.state.roots);
  };
  PushRoot = () => {
    this.setState({ roots: [...this.state.roots, 0] });
  };
  PopRoot = () => {
    this.setState({ roots: this.state.roots.slice(0, -1) });
  };
  change = key => event => {
    this.setState({
      roots: this.state.roots.map((root, i) => {
        if (i !== key) return root;
        return event.target.value;
      })
    });
  };
  latex() {
    try {
      return new Polynom({
        roots: this.state.roots.map(root => (root === "" ? 0 : root))
      }).asProd();
    } catch (error) {
      return error.message;
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <div>
            <IncDecBtn type="button" onClick={this.PushRoot}>
              +
            </IncDecBtn>
            <IncDecBtn type="button" onClick={this.PopRoot}>
              -
            </IncDecBtn>
          </div>
          <div>
            {this.state.roots.map((root, key) => (
              <Input key={key} value={root} onChange={this.change(key)} />
            ))}
          </div>
          <button>{this.props.submitText || "Сохранить"}</button>
        </form>
        <LaTeX>{this.latex()}</LaTeX>
      </div>
    );
  }
}
