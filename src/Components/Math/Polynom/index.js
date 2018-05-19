import React, { Component } from "react";
import LaTeX from "~/Components/UI/LaTeX";
import { Polynom } from "~/core/math/polynoms";
import Gornor from "~/Components/Math/Polynom/Gornor";
import Modal from "react-modal";

export default class PolynomView extends Component {
  state = {
    gornor: false
  };
  showGornor = () => {
    this.setState({ gornor: true });
  };
  hideGornor = () => this.setState({ gornor: false });
  render() {
    const p = new Polynom({ roots: this.props.roots });
    return (
      <div>
        <LaTeX>{p.latex()}</LaTeX>
        <button>Сохранить</button>
        <button onClick={this.showGornor}>Горнор</button>
        <Modal
          isOpen={this.state.gornor}
          onRequestClose={this.hideGornor}
          contentLabel="Схема горнора"
          ariaHideApp={false}
        >
          <button onClick={this.hideGornor}>Закрыть</button>
          <Gornor
            coeffs={p
              .coeffs()
              .slice()
              .reverse()}
            root={-1}
          />
        </Modal>
      </div>
    );
  }
}
