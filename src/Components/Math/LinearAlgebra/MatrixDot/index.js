import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentError, removeCurrentError } from "~/store/actions";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";
import MatrixForm from "~/Components/Math/LinearAlgebra/Matrix/Form";
import Matrix from "~/Components/Math/LinearAlgebra/Matrix";
import PropTypes from "prop-types";
import classes from "./index.css";
import SaveMatrix from "~/Components/UI/Buttons/SaveMatrix";

class MatrixDot extends Component {
  state = {};
  checkAnswer = matrix => {
    if (
      this.props.m1.length !== matrix.length ||
      this.props.m2[0].length !== matrix[0].length
    )
      return this.setState({ dim: true });
    const { m1, m2 } = this.m1m2();
    const m = new NerdMatrix(matrix);
    const right = m1.dot(m2);
    if (right.isEqual(m)) {
      this.setState({ right: right.data(), dim: undefined });
    } else {
      const m1 = new NerdMatrix(right.matrix.subtract(m.matrix));
      this.setState({ matrix: m1.data(), dim: undefined });
    }
  };

  componentWillReceiveProps(props) {
    this.setState({ right: undefined, matrix: undefined, dim: undefined });
  }

  m1m2() {
    const m1 = new NerdMatrix(this.props.m1);
    const m2 = new NerdMatrix(this.props.m2);
    return { m1, m2 };
  }

  render() {
    const { m1, m2 } = this.m1m2();
    const tex = `${m1.latex()}\\cdot ${m2.latex()}= ?`;
    return (
      <div className={classes.Wrap}>
        <h2>Умножение матриц</h2>
        <div>
          <SaveMatrix matrix={this.props.m1} value="Сохранить левую матрицу" />
          <SaveMatrix matrix={this.props.m2} value="Сохранить правую матрицу" />
        </div>
        <LaTeX className={classes.LaTeX}>{tex}</LaTeX>
        {this.state.right ? (
          <div>
            <p>"Верно"</p>
            <Matrix matrix={this.state.right} />
            <SaveMatrix matrix={this.state.right} value="Сохранить результат" />
          </div>
        ) : (
          <div>
            {this.state.dim ? <div>Неверный размер матрицы</div> : null}
            <MatrixForm
              onSubmit={this.checkAnswer}
              hightlight={this.state.matrix}
              buttonText={"Проверить"}
            />
          </div>
        )}
      </div>
    );
  }
}

MatrixDot.PropTypes = {
  m1: PropTypes.arrayOf(PropTypes.array),
  m2: PropTypes.arrayOf(PropTypes.array)
};

const mapDispatchToProps = dispatch => ({
  setError: er => dispatch(setCurrentError(er)),
  removeError: () => dispatch(removeCurrentError())
});

export default connect(null, mapDispatchToProps)(MatrixDot);
