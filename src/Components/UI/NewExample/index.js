import React, { Component } from "react";
import classes from "./index.css";

export default class NewExample extends Component {
  state = {
    showForm: false,
    showSelect: false
  };
  set = object => {
    this.setState({ showForm: false });
    this.props.set(object);
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
          Сгенерировать
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
        {this.state.showSelect && this.props.selectComponent
          ? React.createElement(this.props.selectComponent, {
              onSelect: this.set
            })
          : null}
        {this.state.showForm && this.props.formComponent
          ? React.createElement(this.props.formComponent, {
              onSubmit: this.set
            })
          : null}
      </div>
    );
  }
}
