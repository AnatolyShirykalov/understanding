import React, { Component } from "react";
import classes from "./index.css";
import MatrixForm from "../Matrix/Form";
import MatrixSelect from "../Matrix/Select";

class MatrixNew extends Component {
  state = {
    showForm: false,
    showSelect: false
  };
  set = matrix => {
    this.setState({ showForm: false });
    this.props.set(matrix);
  };
  render() {
    if (!this.props.set) {
      return (
        <div>
          <button onClick={this.props.gen} className={classes.NewBtn}>
            Сгенерировать другую
          </button>
        </div>
      );
    }
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
        <button
          onClick={() => this.setState({ showSelect: !this.state.showSelect })}
          className={classes.NewBtn}
        >
          Сохранённые
        </button>
        {this.state.showSelect ? <MatrixSelect onSelect={this.set} /> : null}
        {this.state.showForm ? <MatrixForm onSubmit={this.set} /> : null}
      </div>
    );
  }
}

export default MatrixNew;
