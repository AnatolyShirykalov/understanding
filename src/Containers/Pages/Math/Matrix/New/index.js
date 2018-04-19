import React, { Component } from "react";
import MatrixForm from "~/Components/Math/LinearAlgebra/Matrix/Form";

class NewMatrix extends Component {
  submit = matrix => {
    console.log("submit", matrix);
  };
  render() {
    return (
      <div>
        <h2>Создание матрицы</h2>
        <MatrixForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default NewMatrix;
