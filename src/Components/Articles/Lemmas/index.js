import React, { Component } from "react";
import classes from "./index.css";
import classNames from "classnames/bind";
import ChangableFormula from "~/Components/UI/ChangableFormula";
import { toOffsets, offsetsBuilder, selects } from "~/core/lemmas";
import LaTeX from "~/Components/UI/LaTeX";
import { omit } from "lodash";

const cx = classNames.bind(classes);

export default class Lemmas extends Component {
  state = {
    selects: {},
    selected: "diff",
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
    if (this.funcLemma()) return this.funcLemmaOffsets();
    this.setState({
      current: null,
      currentName: "",
      lemmas: {
        ...this.state.lemmas,
        [this.state.currentName]: this.state.current
      },
      offsets: [
        ...this.state.offsets,
        ...toOffsets(
          this.state.text,
          this.state.current,
          this.state.droped,
          {
            name: this.state.currentName
          },
          this.funcLemma() ? this.state.offsets : undefined
        )
      ]
    });
  };
  removeLemma = name => () => {
    this.setState({
      lemmas: omit(this.state.lemmas, name),
      offsets: this.state.offsets.filter(off => off.name !== name)
    });
  };
  removeSelect = name => () => {
    const offsetsForBounds = this.state.offsets.filter(
      off => off.name === name
    );
    this.setState({
      selects: omit(this.state.selects, name),
      offsets: this.state.offsets
        .filter(off => off.name !== name)
        .map(offset => {
          if (
            offsetsForBounds.find(ofb => {
              return (
                ofb.start_offset <= offset.start_offset &&
                ofb.end_offset >= offset.end_offset &&
                ofb.arg_names &&
                ofb.arg_names.find(an => an === offset.name)
              );
            })
          )
            return omit(offset, "ignore");
          return offset;
        })
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

  changeSelect = event => {
    this.setState({ selected: event.target.value });
  };
  funcLemma() {
    if (!this.state.current || this.state.text === "") return false;
    const offsets = toOffsets(
      this.state.text,
      this.state.current,
      this.state.droped
    );
    return (
      this.state.offsets.filter(offset => {
        return (
          offsets.filter(off => {
            return (
              off.start_offset <= offset.start_offset &&
              off.end_offset >= offset.end_offset
            );
          }).length > 0
        );
      }).length > 0
    );
  }
  funcLemmaOffsets() {
    if (!this.state.current || this.state.text === "") return;
    const offsets = toOffsets(
      this.state.text,
      this.state.current,
      this.state.droped,
      { name: this.state.currentName }
    );
    let currentOffsets = [...this.state.offsets];
    const newOffsets = offsets.map(funcOffset => {
      const args = [];
      currentOffsets = currentOffsets.map(offset => {
        if (
          offset.ignore ||
          !(
            funcOffset.start_offset <= offset.start_offset &&
            funcOffset.end_offset >= offset.end_offset
          )
        )
          return offset;
        args.push(offset.name);
        return { ...offset, ignore: true };
      });
      return { ...funcOffset, arg_names: args };
    });
    this.setState({
      current: null,
      currentName: "",
      selects: {
        ...this.state.selects,
        [this.state.currentName]: this.state.selected
      },
      offsets: [...currentOffsets, ...newOffsets]
    });
  }

  selects() {
    const ret = {};
    Object.keys(this.state.selects).forEach(key => {
      ret[key] = selects[this.state.selects[key]];
    });
    if (Object.keys(ret).length === 0) return undefined;
    return ret;
  }
  render() {
    return (
      <div>
        <h2>Лемматизация</h2>
        <div className={classes.Wrap}>
          <div className={classes.TextArea}>
            <textarea
              rows={10}
              cols={30}
              value={this.state.text}
              onChange={this.change}
              readOnly={this.state.offsets.length > 0}
            />
            <div>
              <button className={classes.Btn} onClick={this.addLemma}>
                Искать
              </button>
            </div>
          </div>
          <div className={classes.TableWrap}>
            <table>
              <tbody>
                {Object.keys(this.state.lemmas).map(key => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      <LaTeX inline>{this.state.lemmas[key]}</LaTeX>
                    </td>
                    <td>
                      <button
                        className={classes.RemoveBtn}
                        onClick={this.removeLemma(key)}
                        disabled={this.state.offsets.find(
                          offset => offset.name === key && offset.ignore
                        )}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                {Object.keys(this.state.selects).map(key => (
                  <tr key={key + Object.keys(this.state.lemmas).length}>
                    <td>{key}</td>
                    <td>{this.state.selects[key]}</td>
                    <td>
                      <button
                        className={classes.RemoveBtn}
                        onClick={this.removeSelect(key)}
                        disabled={this.state.offsets.find(
                          offset => offset.name === key && offset.ignore
                        )}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={classes.FormWrap}>
            <div>{this.textWithLemma()}</div>
            <div>
              <label>
                <div className={classes.NameLabelWrap}>
                  Опишите обозначение:
                </div>
                <input
                  className={classes.NameInput}
                  value={this.state.currentName}
                  onChange={e => this.setState({ currentName: e.target.value })}
                />
              </label>
            </div>
            {this.funcLemma() ? (
              <div>
                <select
                  value={this.state.selected}
                  onChange={this.changeSelect}
                >
                  <option value="vector">Вектор</option>
                  <option value="diff">Производная</option>
                </select>
              </div>
            ) : null}
            <div>
              <button
                className={classes.OkBtn}
                disabled={this.state.currentName === ""}
                onClick={this.ok}
              >
                Ок
              </button>
            </div>
          </div>
          <div className={classes.Preview}>
            <ChangableFormula
              params={this.state.lemmas}
              builder={offsetsBuilder(this.state.text, this.state.offsets)}
              select={this.selects()}
            />
          </div>
        </div>
      </div>
    );
  }
}
