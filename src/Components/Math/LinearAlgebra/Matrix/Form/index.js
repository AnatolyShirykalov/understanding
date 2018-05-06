import React, { Component } from "react";
import classes from "./index.css";
import classNames from "classnames/bind";
import Matrix from "../";
import SaveMatrix from "~/Components/UI/Buttons/SaveMatrix";
import { genMatrix } from "~/core/math/linearAlgebra";

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
    const matrix = [...this.state.matrix, this.state.matrix[0].map(() => 0)];
    this.setState({
      matrix: this.props.square ? matrix.map(row => [...row, 0]) : matrix
    });
  };
  removeRow = () => {
    const matrix = this.state.matrix.slice(0, -1);
    this.setState({
      matrix: this.props.square ? matrix.map(r => r.slice(0, -1)) : matrix
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

  fill = () => {
    this.setState({
      matrix: genMatrix({
        N: this.state.matrix[0].length,
        M: this.state.matrix.length
      })
    });
  };

  render() {
    const buttonText = this.props.buttonText || "Сохранить";
    return (
      <div className={classes.Wrap}>
        <div className={classes.Form}>
          <button className={classes.Btn} onClick={this.addRow}>
            m++
          </button>
          <button
            className={classes.Btn}
            onClick={this.removeRow}
            disabled={this.state.matrix.length === 1}
          >
            m--
          </button>
          {!this.props.square ? (
            <button className={classes.Btn} onClick={this.addColumn}>
              n++
            </button>
          ) : null}
          {!this.props.square ? (
            <button
              className={classes.Btn}
              onClick={this.removeColumn}
              disabled={this.state.matrix[0].length === 1}
            >
              n--
            </button>
          ) : null}
          <button className={classes.Btn} onClick={this.fill}>
            Заполнить
          </button>
          <table>
            <tbody>
              {this.state.matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <input
                        className={cx({ Red: this.shouldRed(i, j) }, "Input")}
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
