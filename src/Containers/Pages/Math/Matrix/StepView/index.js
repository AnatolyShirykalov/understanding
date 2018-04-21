import React, { Component } from "react";
import * as Structures from "~/core/math/linearAlgebra";
import Elementary from "../Elementary";
import NewExample from "~/Components/UI/NewExample";
import MatrixForm from "~/Components/Math/LinearAlgebra/Matrix/Form";
import MatrixSelect from "~/Components/Math/LinearAlgebra/Matrix/Select";
import { connect } from "react-redux";
import { setCurrentError } from "~/store/actions";
class StepView extends Component {
  state = {
    matrix: Structures.genMatrix()
  };
  gen = () => {
    try {
      const matrix = Structures.genMatrix();
      this.setState({ matrix });
    } catch (er) {
      this.props.setError(er.message);
    }
  };
  set = matrix => {
    try {
      new Structures.NerdMatrix(matrix);
      this.setState({ matrix });
    } catch (error) {
      this.props.setError(error.message);
    }
  };
  render() {
    return (
      <div>
        <h2>
          Приведите матрицу к ступенчатому виду элементарными преобразованиями
          вида 1
        </h2>
        <NewExample
          gen={this.gen}
          set={this.set}
          selectComponent={MatrixSelect}
          formComponent={MatrixForm}
        />
        <Elementary matrix={this.state.matrix} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setError: er => dispatch(setCurrentError(er))
});

export default connect(null, mapDispatchToProps)(StepView);
