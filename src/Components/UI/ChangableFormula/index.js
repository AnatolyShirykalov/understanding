import React, { Component } from "react";
import LaTeX from "~/Components/UI/LaTeX";
import Modal from "react-modal";
import { DebounceInput } from "react-debounce-input";
import classes from "./index.css";
class Eqer {
  constructor(defaultProps, latex) {
    this.props = defaultProps;
    this._latex = latex;
  }
  latex(props = {}) {
    return this._latex({ ...this.props, ...props });
  }
}

export default class ChangableFormula extends Component {
  state = {
    params: {},
    selected: {}
  };
  showModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  change = key => event => {
    this.setState({
      params: { ...this.state.params, [key]: event.target.value }
    });
  };
  changeSelect = key => event => {
    this.setState({
      selected: { ...this.state.selected, [key]: event.target.value }
    });
  };
  cleanParams() {
    const obj = {};
    for (let key in this.state.params) {
      const v = this.state.params[key];
      if (!v || v === "") continue;
      obj[key] = v;
    }
    for (let key in this.state.selected) {
      const s = this.state.selected[key];
      if (s) {
        obj[key] = this.props.select[key][+s].func;
        continue;
      }
    }
    return obj;
  }

  render() {
    const eq = new Eqer(this.props.params, this.props.builder);
    return (
      <div>
        <LaTeX inline>{eq.latex(this.cleanParams())}</LaTeX>
        <button onClick={this.showModal}>Обозначения</button>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          contentLabel="Изменить обозначения"
          ariaHideApp={false}
        >
          <button onClick={this.closeModal}>Закрыть</button>
          <h3>Изменить обозначения</h3>
          <div className={classes.Wrap}>
            <div className={classes.Vars}>
              <table>
                <tbody>
                  {Object.keys(this.props.params)
                    .filter(key => typeof this.props.params[key] === "string")
                    .map(key => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          <LaTeX inline>{this.props.params[key]}</LaTeX>
                        </td>
                        <td>
                          <DebounceInput
                            debounceTimeout={300}
                            value={this.state.params[key] || ""}
                            onChange={this.change(key)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {this.props.select ? (
              <div className={classes.Selects}>
                <table>
                  <tbody>
                    {Object.keys(this.props.select).map(key => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>
                          <select
                            value={this.state.selected[key] || 0}
                            onChange={this.changeSelect(key)}
                          >
                            {this.props.select[key].map((option, i) => (
                              <option key={i} value={i}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <LaTeX className={classes.Formula}>
              {eq.latex(this.cleanParams())}
            </LaTeX>
          </div>
        </Modal>
      </div>
    );
  }
}
