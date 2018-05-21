import React, { Component } from "react";
import LaTeX from "~/Components/UI/LaTeX";
import Input from "~/Components/UI/Input";
import classes from "./index.css";
import classNames from "classnames/bind";
import { Polynom } from "~/core/math/polynoms";
import SavePolynom from "~/Components/UI/Buttons/SavePolynom";

const cx = classNames.bind(classes);

export default class Gornor extends Component {
  state = {
    root: 0,
    coeffs: this.props.coeffs.map((a, i) => (i === 0 ? a : 0)),
    highlight: false
  };
  componentWillReceiveProps(props) {
    if (this.props.coeffs !== props.coeffs) {
      this.setState({ coeffs: props.coeffs.map((a, i) => (i === 0 ? a : 0)) });
    }
  }
  change = i => event => {
    this.setState({
      coeffs: this.state.coeffs.map((coeff, I) => {
        if (i !== I) return coeff;
        return event.target.value;
      })
    });
  };
  focus = i => () => {
    this.setState({ highlight: i });
  };
  blur = () => {
    this.setState({ highlight: false });
  };
  submit = () => {
    if (!this.props.onSubmit) return;
    this.props.onSubmit(this.state.coeffs);
  };
  render() {
    const n = this.props.coeffs.length;
    const p = new Polynom({ coeffs: this.props.coeffs });
    let denom;
    if (this.props.expectedRoot)
      denom = new Polynom({ roots: [this.props.expectedRoot] });
    return (
      <div>
        {this.props.expectedRoot ? (
          <div>
            <LaTeX>{`\\frac{${p.latex()}}{${denom.latex()}}=\\,?`}</LaTeX>
          </div>
        ) : null}
        <table className={classes.Table}>
          <tbody>
            <tr>
              <td className={classes.Td}>↓Корень↓</td>
              {this.props.coeffs.map((coeff, i) => (
                <td
                  key={n - i}
                  className={cx("Td", {
                    Highlight: this.state.highlight === i
                  })}
                >
                  <LaTeX inline>{coeff}</LaTeX>
                </td>
              ))}
            </tr>
            <tr>
              <td
                className={cx("Td", {
                  Highlight: this.state.highlight && this.state.highlight > 0
                })}
              >
                <Input
                  onChange={e => this.setState({ root: e.target.value })}
                  value={this.state.root}
                />
              </td>
              {this.state.coeffs.map((coeff, i) => (
                <td
                  key={n - i}
                  className={cx("Td", {
                    Highlight: this.state.highlight === i + 1
                  })}
                >
                  <Input
                    onFocus={this.focus(i)}
                    onBlur={this.blur}
                    onChange={this.change(i)}
                    value={coeff}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <LaTeX>
          {new Polynom({
            coeffs: this.state.coeffs.slice(0, -1).reverse(),
            x: "x"
          }).latex()}
        </LaTeX>
        <SavePolynom matrix={{ coeffs: this.state.coeffs }} />
        <button onClick={this.submit}>Ответить</button>
      </div>
    );
  }
}
