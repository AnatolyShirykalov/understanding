import React, { Component } from "react";
import classes from "./index.css";
import MatrixForm from "../Matrix/Form";

class MatrixNew extends Component {
  state = {
    showForm: false
  };
  set = matrix => {
    this.setState({ showForm: false });
    this.props.set(matrix);
  };
  render() {
    return (
      <div>
        <button onClick={this.props.gen} className={classes.NewBtn}>
          Сгенерировать другую
        </button>
        <button
          onClick={() => this.setState({ showForm: !this.state.showForm })}
          className={classes.NewBtn}
        >
          Конструктор
        </button>
        {this.state.showForm ? <MatrixForm onSubmit={this.set} /> : null}
      </div>
    );
  }
}

export default MatrixNew;
