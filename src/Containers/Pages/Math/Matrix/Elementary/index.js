import React, { Component } from "react";
import MatrixPair from "~/Components/Math/LinearAlgebra/MatrixPair";
import ElementaryHistory from "~/Components/Math/LinearAlgebra/ElementaryHistory";
import ElementaryForm from "~/Components/Math/LinearAlgebra/ElementaryForm";
import * as Structures from "~/core/math/linearAlgebra";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentError, removeCurrentError } from "~/store/actions";
import classes from "./index.css";
import SaveMatrix from "~/Components/UI/Buttons/SaveMatrix";

const newTransforms = ar =>
  ar.map((_, i) => ({ multiplicator: 0, rowNumber: 0 }));

class Elementary extends Component {
  state = {
    key: 1,
    chain: [],
    matrix: this.props.matrix,
    nextMatrix: this.props.matrix,
    transforms: newTransforms(this.props.matrix)
  };

  componentWillReceiveProps({ matrix }) {
    this.setState({
      chain: [],
      matrix,
      nextMatrix: matrix,
      transforms: newTransforms(matrix)
    });
  }
  decorateLineNumber = i => {
    return `(${i + 1})`;
  };

  change = (field, i) => ({ target: { value } }) => {
    const transforms = this.state.transforms.map((t, j) => {
      if (j !== i) return t;
      return { ...t, [field]: field === "rowNumber" ? +value : value };
    });
    this.setState({ transforms });
    this.updateNewMatrix(transforms);
  };

  updateNewMatrix(transforms) {
    const m1 = new Structures.NerdMatrix(this.state.matrix);
    try {
      const m2 = m1.e1s(transforms);
      this.setState({ nextMatrix: m2.data() });
      this.props.removeError();
    } catch (er) {
      this.props.setError(er.message);
    }
  }

  inputWidth = () => {
    return (
      Math.max(
        ...this.state.transforms.map(
          ({ multiplicator }) => (multiplicator + "").length
        ),
        2
      ) + "em"
    );
  };

  save = () => {
    this.setState({
      matrix: this.state.nextMatrix,
      transforms: newTransforms(this.state.nextMatrix),
      chain: [
        ...this.state.chain,
        {
          matrices: [this.state.matrix, this.state.nextMatrix],
          transforms: this.state.transforms
        }
      ]
    });
  };

  shouldNotSave = () => {
    return new Structures.NerdMatrix(this.state.matrix).isEqual(
      new Structures.NerdMatrix(this.state.nextMatrix)
    );
  };

  saveCurrentMatrixToStorage = () => {
    if (this.state.savingMatrixToStorage) return;
    setTimeout(() => {
      this.setState({ savingMatrixToStorage: true });
      const raw = localStorage.getItem("matrixSelectData");
      let matrices = [];
      if (raw) {
        matrices = [...JSON.parse(raw), this.state.matrix];
      } else {
        matrices = [this.state.matrix];
      }
      localStorage.setItem("matrixSelectData", JSON.stringify(matrices));
      this.setState({ savingMatrixToStorage: false });
    }, 0);
  };

  undoTo = key => {
    this.setState({
      chain: this.state.chain.slice(0, key + 1),
      matrix: this.state.chain[key].matrices[0],
      nextMatrix: this.state.chain[key].matrices[1]
    });
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <MatrixPair
          key={this.state.key}
          matrices={[this.state.matrix, this.state.nextMatrix]}
        />
        <ElementaryForm
          transforms={this.state.transforms}
          decorateLineNumber={this.decorateLineNumber}
          inputWidth={this.inputWidth()}
          change={this.change}
        />
        <div style={{ marginBottom: "10px" }}>
          <button
            className={classes.Btn}
            onClick={this.save}
            disabled={this.shouldNotSave()}
          >
            Сохранить состояние
          </button>
        </div>
        <div>
          <SaveMatrix matrix={this.state.matrix} value="Сохранить матрицу" />
        </div>
        <div>
          <ElementaryHistory
            undoTo={this.undoTo}
            items={this.state.chain}
            decorateLineNumber={this.decorateLineNumber}
          />
        </div>
      </div>
    );
  }
}

Elementary.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.array)
};

Elementary.defaultProps = {
  matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
};

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setCurrentError(error)),
  removeError: () => dispatch(removeCurrentError())
});

export default connect(null, mapDispatchToProps)(Elementary);
