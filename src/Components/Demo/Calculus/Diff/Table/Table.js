import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions";
import nerdamer from "nerdamer";
import "nerdamer/all";
import MathJax from "../../../../../vendor/react-mathjax/src";
import { table } from "../../../../../core/calculus/examples";
import C from "../../../../../core/calculus";
import Base, { mDTP, mSTP, withTIC } from "../Base";
import classes from "./Table.css";
import { ToDo, MathPairs } from "../Components";

class Table extends Base {
  isDegree = () => {
    return this.withTaskId("parentId") && this.withTaskId("fun") === "x^a";
  };

  rightAnswer = () => {
    const ex = nerdamer(this.withTaskId("expression"));
    return new C(this.answer(), ex.text()).compare();
  };

  answer() {
    let ans = "";
    if (this.isDegree()) {
      const a = +this.withTaskId("a");
      ans = nerdamer(this.withTaskId("fun"), { a });
    } else ans = nerdamer(this.withTaskId("fun"));
    return ans.text();
  }

  componentDidUpdate() {
    const a = this.withTaskId("a");
    if (
      (!this.isDegree() || (!isNaN(+a) && +a + "" === a)) &&
      this.rightAnswer()
    )
      this.baseGoToParent(nerdamer.diff(this.answer()).text());
  }

  render() {
    return (
      <MathJax.Context>
        <div>
          <h3>Таблица производных</h3>
          {this.validExpression() ? (
            <ToDo
              tex={nerdamer(this.withTaskId("expression"), { y: "x" }).toTeX()}
            />
          ) : (
            <div>Здесь могло бы быть ваше выражение</div>
          )}
          {this.withTaskId("parentId") ? this.backRender() : null}
          <div className={classes.Table}>
            <h4>Вот таблица производных</h4>
            {table.map(({ fun, diff }) => (
              <div
                key={fun}
                className={classes.TableItem}
                onClick={this.props.selectTableItem(this.taskId(), fun)}
              >
                <MathJax.Node>
                  {`\\left(${nerdamer(fun).toTeX()}\\right)' = ${nerdamer(
                    diff
                  ).toTeX()}`}
                </MathJax.Node>
              </div>
            ))}
          </div>
          {this.isDegree() ? (
            <div>
              <h4>
                Укажите нужный параметр <MathJax.Node inline>a</MathJax.Node>
              </h4>
              <MathPairs keys={["a"]} taskId={this.taskId()} />
            </div>
          ) : null}
        </div>
      </MathJax.Context>
    );
  }
}

const mapStateToProps = ({ calculus }) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    fun: withTI("fun"),
    a: withTI("a")
  };
};

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  selectTableItem: (taskId, fun) => () =>
    dispatch(actions.selectDiffTableItem(taskId, fun))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
