import React, { Component } from "react";
import classes from "./index.css";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";
import Selectable from "~/Components/UI/Selectable";
import Modal from "react-modal";
import SaveMatrixBtn from "~/Components/UI/Buttons/SaveMatrix";
import classNames from "classnames/bind";

const cx = classNames.bind(classes);

const intersectRect = (r1, r2) => {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
};

const containRect = (r1, r2) => {
  return !(
    r2.left < r1.left ||
    r2.right > r1.right ||
    r2.top < r1.top ||
    r2.bottom > r1.bottom
  );
};

const intersectHalf = (r1, r2) => {
  if (!intersectRect(r1, r2)) return false;
  if (containRect(r1, r2)) return true;
  const area = (r2.right - r2.left) * (r2.bottom - r2.top);
  const section = {
    left: Math.max(r1.left, r2.left),
    right: Math.min(r1.right, r2.right),
    top: Math.max(r1.top, r2.top),
    bottom: Math.max(r1.bottom, r2.bottom)
  };
  return (
    (section.right - section.left) * (section.bottom - section.top) / area > 0.5
  );
};

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
  render() {
    try {
      return (
        <div className={cx({ Inline: this.props.inline })}>
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
          <Selectable
            onSelection={this.selection}
            Component={this.props.inline ? <span /> : <div />}
          >
            <LaTeX
              className={classes.Matrix}
              onDidUpdate={this.refreshGeometry}
              inline={this.props.inline}
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
