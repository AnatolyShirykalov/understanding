import React, { Component } from "react";
import classes from "./index.css";
import classNames from "classnames/bind";
import ChangableFormula from "~/Components/UI/ChangableFormula";
import { toOffsets, offsetsBuilder } from "~/core/lemmas";
import LaTeX from "~/Components/UI/LaTeX";

const cx = classNames.bind(classes);

export default class Lemmas extends Component {
  state = {
    offsets: [],
    lemmas: {},
    current: null,
    currentName: "",
    text: "",
    droped: {}
  };
  addLemma = () => {
    this.setState({ current: window.getSelection().toString() });
  };
  change = e => {
    this.setState({ text: e.target.value });
  };
  toggleItem = i => () => {
    this.setState({
      droped: { ...this.state.droped, [i]: !this.state.droped[i] }
    });
  };
  ok = () => {
    this.setState({
      current: null,
      currentName: "",
      lemmas: {
        ...this.state.lemmas,
        [this.state.currentName]: this.state.current
      },
      offsets: [
        ...this.state.offsets,
        ...toOffsets(this.state.text, this.state.current, this.state.droped, {
          name: this.state.currentName
        })
      ]
    });
  };
  textWithLemma() {
    let i = -1;
    return this.state.text.split(this.state.current).reduce((all, next) => {
      i += 1;
      const s = (
        <span className={classes.Between} key={2 * i}>
          {next}
        </span>
      );
      if (i === 0) return [s];

      return [
        ...all,
        <span
          key={2 * i + 1}
          onClick={this.toggleItem(i)}
          className={cx("Target", { Active: !this.state.droped[i] })}
        >
          {this.state.current}
        </span>,
        s
      ];
    }, []);
  }
  render() {
    return (
      <div>
        <h2>Лемматизация</h2>
        <button onClick={this.addLemma}>Искать</button>
        <textarea value={this.state.text} onChange={this.change} />
        <table>
          <tbody>
            {Object.keys(this.state.lemmas).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <LaTeX inline>{this.state.lemmas[key]}</LaTeX>
                </td>
                <td>
                  <button>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{this.textWithLemma()}</div>
        <input
          value={this.state.currentName}
          onChange={e => this.setState({ currentName: e.target.value })}
        />
        <button disabled={this.state.currentName === ""} onClick={this.ok}>
          Ок
        </button>
        <ChangableFormula
          params={this.state.lemmas}
          builder={offsetsBuilder(this.state.text, this.state.offsets)}
        />
      </div>
    );
  }
}
