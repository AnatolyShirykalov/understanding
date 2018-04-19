import React, { Component } from "react";
import Matrix from "../";
import classes from "./index.css";
import classNames from "classnames/bind";

const cx = classNames.bind(classes);

export default class MatrixSelect extends Component {
  state = {
    matrices: []
  };

  componentDidMount() {
    const raw = localStorage.getItem("matrixSelectData");
    if (!raw) return;
    this.setState({ matrices: JSON.parse(raw) });
  }

  deleteMatrix = i => {
    const matrices = this.state.matrices.filter((m, I) => I !== i);
    localStorage.setItem("matrixSelectData", JSON.stringify(matrices));
    this.setState({ matrices });
  };
  render() {
    return (
      <div>
        {this.state.matrices.map((matrix, i) => (
          <div key={i} className={cx({ Even: i % 2 === 1, Odd: i % 2 === 0 })}>
            <button
              className={classes.Btn}
              onClick={() => this.props.onSelect(matrix)}
            >
              Выбрать
            </button>
            <button
              className={classes.Btn}
              onClick={() => this.deleteMatrix(i)}
            >
              Удалить
            </button>
            <Matrix matrix={matrix} />
          </div>
        ))}
      </div>
    );
  }
}
