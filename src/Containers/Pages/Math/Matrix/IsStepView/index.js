import React, { Component } from "react";
import MatrixNew from "~/Components/Math/LinearAlgebra/MatrixNew";
import * as Structures from "~/core/math/linearAlgebra";
import Matrix from "~/Components/Math/LinearAlgebra/Matrix";
import classes from "./index.css";

class IsStepView extends Component {
  constructor() {
    super();
    const matrix = Structures.genMatrix({ step: Math.random() });
    this.state = {
      matrix
    };
  }

  gen = () => {
    const matrix = Structures.genMatrix({ step: Math.random() });
    this.setState({ matrix, answer: undefined });
  };

  yes = () => {
    this.setState({ answer: true });
  };

  no = () => {
    this.setState({ answer: false });
  };

  buttons() {
    if (this.state.answer !== undefined) {
      const matrix = new Structures.NerdMatrix(this.state.matrix);
      let text = "Спасибо, два";
      if (this.state.answer === matrix.isStep()) {
        text = "Действительно";
      }
      return (
        <div>
          <div>{text}</div>
          <MatrixNew gen={this.gen} />
        </div>
      );
    }
    return (
      <div className={classes.YesNo}>
        <button onClick={this.yes}>Да</button>
        <button onClick={this.no}>Нет</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <MatrixNew gen={this.gen} />
        <h2>Имеет ли данная матрица ступечатый вид</h2>
        <Matrix matrix={this.state.matrix} />
        {this.buttons()}
      </div>
    );
  }
}

export default IsStepView;
