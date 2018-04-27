import React, { Component } from "react";
import classes from "./index.css";
import classNames from "classnames/bind";
import Matrix from "../";
import SaveMatrix from "~/Components/UI/Buttons/SaveMatrix";

const cx = classNames.bind(classes);

export default class MatrixForm extends Component {
  state = {
    matrix: [[0, 0], [0, 0]]
  };

  set = (i, j, e) => {
    this.setState({
      matrix: this.state.matrix.map((r, I) => {
        if (I !== i) return r;
        return r.map((c, J) => {
          if (J !== j) return c;
          return e.target.value;
        });
      })
    });
  };

  addColumn = () => {
    this.setState({
      matrix: this.state.matrix.map(row => [...row, 0])
    });
  };
  addRow = () => {
    this.setState({
      matrix: [...this.state.matrix, this.state.matrix[0].map(() => 0)]
    });
  };
  removeRow = () => {
    this.setState({
      matrix: this.state.matrix.slice(0, -1)
    });
  };
  removeColumn = () => {
    this.setState({
      matrix: this.state.matrix.map(r => r.slice(0, -1))
    });
  };

  focus = (i, j) => {
    if (+this.state.matrix[i][j] !== 0) return;
    this.setState({
      matrix: this.state.matrix.map((r, I) => {
        if (I !== i) return r;
        return r.map((c, J) => {
          if (j !== J) return c;
          return "";
        });
      })
    });
  };

  blur = (i, j) => {
    if (this.state.matrix[i][j] !== "") return;
    this.setState({
      matrix: this.state.matrix.map((r, I) => {
        if (I !== i) return r;
        return r.map((c, J) => {
          if (j !== J) return c;
          return 0;
        });
      })
    });
  };

  shouldRed = (i, j) => {
    if (!this.props.hightlight) return false;
    try {
      return this.props.hightlight[i][j] !== "0";
    } catch (er) {
      return true;
    }
  };

  render() {
    const buttonText = this.props.buttonText || "Сохранить";
    return (
      <div className={classes.Wrap}>
        <div className={classes.Form}>
          <button onClick={this.addRow}>m++</button>
          <button onClick={this.addColumn}>n++</button>
          <button
            onClick={this.removeRow}
            disabled={this.state.matrix.length === 1}
          >
            m--
          </button>
          <button
            onClick={this.removeColumn}
            disabled={this.state.matrix[0].length === 1}
          >
            n--
          </button>
          <table>
            <tbody>
              {this.state.matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <input
                        className={cx({ Red: this.shouldRed(i, j) })}
                        value={cell}
                        onChange={e => this.set(i, j, e)}
                        onFocus={() => this.focus(i, j)}
                        onBlur={() => this.blur(i, j)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={classes.Submit}
            onClick={() => this.props.onSubmit(this.state.matrix)}
          >
            {buttonText}
          </button>
          <Matrix matrix={this.state.matrix} />
          <SaveMatrix
            matrix={this.state.matrix}
            value="Сохранить текущую матрицу"
          />
        </div>
      </div>
    );
  }
}
