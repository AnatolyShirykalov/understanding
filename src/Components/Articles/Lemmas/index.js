import React, { Component } from "react";
import classes from "./index.css";
import classNames from "classnames/bind";
import ChangableFormula from "~/Components/UI/ChangableFormula";

const cx = classNames.bind(classes);

const toOffsets = (text, ptrn, blacklist, obj = {}) => {
  const pt = new RegExp(ptrn, "g");
  const ret = [];
  let i = 0;
  let match;
  while ((match = pt.exec(text))) {
    i += 1;
    if (i > 1000000) throw new Error("iteration limit exceed");
    if (blacklist[i]) continue;
    ret.push({
      ...obj,
      start_offset: match.index,
      end_offset: match.index + ptrn.length
    });
  }
  return ret;
};

const offsetsBuilder = (text, offsets) => args => {
  console.log(offsets);
  return offsets.reduce((ret, offset) => {
    let m = args[offset.name];
    console.log(args);
    if (offset.arg_names) {
      m = m(...offset.arg_names.map(n => args[n]));
    }
    return (
      ret.substr(0, offset.start_offset) + m + ret.substr(offset.end_offset)
    );
  }, text.slice());
};

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
