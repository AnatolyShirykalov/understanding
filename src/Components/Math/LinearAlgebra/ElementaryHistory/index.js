import React, { Component } from "react";
import classes from "./index.css";
import classnames from "classnames";
import Item from "./Item";
import { Scalar } from "~/core/math/linearAlgebra";

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
            .reverse()
            .map((item, key) => (
              <Item
                item={item}
                key={key}
                prettyTransform={this.prettyTransform}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ElementaryHistory;
