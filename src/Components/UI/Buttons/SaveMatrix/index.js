import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./index.css";

class SaveMatrix extends Component {
  state = {
    saving: false
  };
  save = () => {
    if (this.state.saving) return;
    setTimeout(() => {
      this.setState({ saving: true });
      const raw = localStorage.getItem(this.props.storageKey);
      let matrices = [];
      if (raw) {
        matrices = [...JSON.parse(raw), this.props.matrix];
      } else {
        matrices = [this.props.matrix];
      }
      localStorage.setItem(this.props.storageKey, JSON.stringify(matrices));
      this.setState({ saving: false, same: true });
    }, 0);
  };
  componentWillReceiveProps(props) {
    if (this.props.matrix !== props.matrix) this.setState({ same: false });
  }
  render() {
    return (
      <button
        className={classes.Btn}
        onClick={this.save}
        disabled={this.state.saving || this.state.same}
      >
        {this.props.value}
      </button>
    );
  }
}

SaveMatrix.propTypes = {
  value: PropTypes.string,
  matrix: PropTypes.arrayOf(PropTypes.array).isRequired,
  storageKey: PropTypes.string
};

SaveMatrix.defaultProps = {
  value: "Сохранить",
  storageKey: "matrixSelectData"
};

export default SaveMatrix;
