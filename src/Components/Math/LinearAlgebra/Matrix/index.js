import React, { Component } from "react";
import classes from "./index.css";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";
import Selectable from "~/Components/UI/Selectable";
import Modal from "react-modal";
import SaveMatrixBtn from "~/Components/UI/Buttons/SaveMatrix";
import classNames from "classnames/bind";
import { intersectHalf, pointInRect } from "~/core/collisions";
import KeyHandler, { KEYDOWN, KEYUP } from "react-key-handler";

const cx = classNames.bind(classes);

export default class Matrix extends Component {
  state = {
    latex: ""
  };
  refreshGeometry = wrap => {
    setTimeout(() => {
      const table = wrap.querySelector(".mjx-mtable");
      if (!table) return;
      const rowNodes = table.querySelectorAll(
        `#${table.id} > .mjx-table > .mjx-mtr`
      );
      const dx = window.scrollX;
      const dy = window.scrollY;

      const rows = [].map.call(rowNodes, rowNode => {
        return [].map.call(
          rowNode.querySelectorAll(`#${rowNode.id} > .mjx-mtd`),
          cellNode => {
            const {
              top,
              left,
              right,
              bottom
            } = cellNode.getBoundingClientRect();
            return {
              top: top + dy,
              left: left + dx,
              right: right + dx,
              bottom: bottom + dy
            };
          }
        );
      });
      this.geometry = rows;
      //console.log(JSON.stringify(rows));
    }, 0);
  };
  selection = rect => {
    const Is = [];
    const Js = [];
    this.geometry.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (intersectHalf(rect, cell)) {
          Is.push(i);
          Js.push(j);
        }
      });
    });
    if (Is.length > 0 && Js.length > 0) {
      const i = Is[0],
        I = Is[Is.length - 1],
        j = Js[0],
        J = Js[Js.length - 1];
      const submatrix = this.props.matrix
        .filter((row, ii) => ii >= i && ii <= I)
        .map(row => row.filter((cell, jj) => jj >= j && jj <= J));
      this.setState({
        submatrixTex: new NerdMatrix(submatrix).latex(),
        submatrix
      });
    } else {
      if (this.state.submatrixTex) this.setState({ submatrixTex: undefined });
    }
  };
  componentDidMount() {
    const matrix = this.props.matrix;
    this.setState({ latex: this.calcTex(matrix) });
  }
  calcTex(matrix) {
    try {
      const m = matrix.map(row => row.map(c => (c === "" ? 0 : c)));
      return new NerdMatrix(m).latex();
    } catch (er) {
      return er.message;
    }
  }
  componentWillReceiveProps(props) {
    this.setState({ latex: this.calcTex(props.matrix) });
  }
  closeModal = () => {
    this.setState({ submatrixTex: null });
  };
  click = event => {
    if (!(event instanceof MouseEvent)) return;
    if (!event.ctrlKey) return;
    let I, J;
    this.geometry.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (pointInRect({ x: event.pageX, y: event.pageY }, cell)) {
          I = i;
          J = j;
        }
      });
    });
    console.log("click", I, J);
    if (I === undefined || J === undefined) return;
    const submatrix = this.props.matrix
      .filter((_, i) => i !== I)
      .map(row => row.filter((_, j) => j !== J));
    this.setState({
      submatrix,
      submatrixTex: new NerdMatrix(submatrix).latex()
    });
  };
  highlightStyle() {
    const ret = {};
    if (typeof this.props.highlight !== "string") return ret;
    if (!this.geometry) return ret;
    switch (this.props.highlight[0]) {
      case "c":
        const J = +this.props.highlight.slice(1);
        const { top, left } = this.geometry[0][J];
        const { right, bottom } = this.geometry[this.geometry.length - 1][J];
        return {
          top: `${top}px`,
          left: `${left}px`,
          width: `${right - left}px`,
          height: `${bottom - top}px`
        };
      case "r":
        const I = +this.props.highlight.slice(1);
        const first = this.geometry[I][0];
        const last = this.geometry[I][this.geometry[I].length - 1];
        return {
          top: `${first.top}px`,
          left: `${first.left}px`,
          width: `${last.right - first.left}px`,
          height: `${last.bottom - first.top}px`
        };
      default:
        return ret;
    }
  }
  render() {
    try {
      return (
        <div className={cx({ Inline: this.props.inline })}>
          <KeyHandler
            keyEventName={KEYDOWN}
            keyCode={17}
            onKeyHandle={() => this.setState({ minor: true })}
          />
          <KeyHandler
            keyEventName={KEYUP}
            keyCode={17}
            onKeyHandle={() => this.setState({ minor: false })}
          />
          <Modal
            isOpen={this.state.submatrixTex ? true : false}
            onRequestClose={this.closeModal}
            contentLabel="Что сделать с подматрицей?"
            ariaHideApp={false}
          >
            {this.state.submatrixTex ? (
              <div>
                <LaTeX>{this.state.submatrixTex}</LaTeX>
                <SaveMatrixBtn matrix={this.state.submatrix} />
              </div>
            ) : null}
          </Modal>
          {this.props.highlight ? (
            <div className={classes.Rect} style={this.highlightStyle()} />
          ) : null}
          <Selectable
            onSelection={this.selection}
            onClick={this.click}
            Component={this.props.inline ? <span /> : <div />}
          >
            <LaTeX
              className={cx(classes.Matrix, { Minor: this.state.minor })}
              onDidUpdate={this.refreshGeometry}
              inline={this.props.inline}
              onClick={this.click}
            >
              {this.state.latex}
            </LaTeX>
          </Selectable>
        </div>
      );
    } catch (error) {
      return <div>{error.message}</div>;
    }
  }
}
