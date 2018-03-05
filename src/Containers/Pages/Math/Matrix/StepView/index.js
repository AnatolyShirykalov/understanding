import React, {Component} from 'react';
import * as Structures from '~/core/math/linearAlgebra';
import Elementary from '../Elementary';
import MatrixNew from '~/Components/Math/LinearAlgebra/MatrixNew';
import {connect} from 'react-redux';
import {setCurrentError} from '~/store/actions';
class StepView extends Component{
  state={
    matrix: Structures.genMatrix(),
  }
  gen = () => {
    try {
      const matrix = Structures.genMatrix();
      this.setState({matrix});
    } catch (er) {
      this.props.setError(er.message);
    }
  }
  render() {
    return (
      <div>
        <h2>Приведите матрицу к ступенчатому виду элементарными преобразованиями вида 1</h2>
        <MatrixNew gen={this.gen}/>
        <Elementary matrix={this.state.matrix}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({setError: er => dispatch(setCurrentError(er))});

export default connect(null, mapDispatchToProps)(StepView);
