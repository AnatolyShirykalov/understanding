import React, { Component } from "react";
import classes from "./index.css";
import classnames from "classnames";
import Item from "./Item";
import { Scalar } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";

const mapsto = "\\mapsto";
const times = "\\times";

class ElementaryHistory extends Component {
  state = {
    expand: false
  };

  noItems() {
    return !this.props.items || this.props.items.length === 0;
  }

  length() {
    if (this.noItems()) return 0;
    return this.props.items.length;
  }

  toggle = () => {
    this.setState({ expand: !this.state.expand });
  };

  decorate = i => {
    return this.props.decorateLineNumber(i);
  };

  prettyTransform = (i, { rowNumber, multiplicator }) => {
    return `${this.decorate(i)}${mapsto}${this.decorate(i)}+(${new Scalar(
      multiplicator
    ).latex()})${times}${this.decorate(rowNumber)}`;
  };

  expandedTransform = (i, { rowNumber, multiplicator }) => {
    return (
      <div>
        <span>
          {`К ${this.decorate(i)}-й строке прибавили ${this.decorate(
            rowNumber
          )}-ю, умноженную на `}
        </span>
        <LaTeX inline>{new Scalar(multiplicator).latex()}</LaTeX>
        <span>;</span>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          <button
            className={classes.Btn}
            onClick={this.toggle}
            disabled={this.noItems()}
          >
            {this.state.expand
              ? "Свернуть"
              : `Развернуть историю (${this.length()})`}
          </button>
        </div>
        <div className={classnames({ [classes.Hide]: !this.state.expand })}>
          {this.props.items
            .slice()
            .reverse()
            .map((item, key) => (
              <Item
                item={item}
                key={key}
                onClick={() => this.props.undoTo(key)}
                prettyTransform={this.prettyTransform}
                expandedTransform={this.expandedTransform}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ElementaryHistory;
