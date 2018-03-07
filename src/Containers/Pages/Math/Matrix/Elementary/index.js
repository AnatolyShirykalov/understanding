import React, {Component} from 'react';
import MatrixPair from '~/Components/Math/LinearAlgebra/MatrixPair';
import ElementaryHistory from '~/Components/Math/LinearAlgebra/ElementaryHistory';
import ElementaryForm from '~/Components/Math/LinearAlgebra/ElementaryForm';
import * as Structures from '~/core/math/linearAlgebra';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setCurrentError, removeCurrentError} from '~/store/actions';
import classes from './index.css';

const newTransforms = ar => ar.map((_, i)=>({multiplicator: 0, rowNumber: 0}));

class Elementary extends Component{
  state = {
    key: 1,
    chain: [],
    matrix: this.props.matrix,
    nextMatrix: this.props.matrix,
    transforms: newTransforms(this.props.matrix),
  }

  componentWillReceiveProps({matrix}) {
    this.setState({
      chain: [],
      matrix,
      nextMatrix: matrix,
      transforms: newTransforms(matrix),
    });
  }
  decorateLineNumber = (i) => {
    return `(${i+1})`;
  }

  change = (field, i) => ({target: {value}}) => {
    const transforms = this.state.transforms.map((t, j) => {
      if(j!==i) return t;
      return {...t, [field]: field === 'rowNumber' ? +value : value};
    })
    this.setState({transforms});
    this.updateNewMatrix(transforms)
  }

  updateNewMatrix(transforms) {
    const m1 = new Structures.Matrix(this.state.matrix);
    try {
      const m2 = m1.e1s(transforms);
      this.setState({nextMatrix: m2.matrix._data});
      this.props.removeError();
    } catch (er) {
      this.props.setError(er.message);
    }
  }

  inputWidth = () => {
    return Math.max(...this.state.transforms.map(({multiplicator})=>(multiplicator+'').length), 2) + 'em';
  }

  save = () => {
    this.setState({
      matrix: this.state.nextMatrix,
      transforms: newTransforms(this.state.nextMatrix),
      chain: [
        ...this.state.chain,
        {
          matrices: [this.state.matrix, this.state.nextMatrix],
          transforms: this.state.transforms,
        },
      ],
    });
  }

  shouldNotSave = () => {
    return new Structures.Matrix(this.state.matrix).isEqual(new Structures.Matrix(this.state.nextMatrix));
  }


  render() {
    return (
      <div style={{position: 'relative'}}>
        <button
          onClick={() => this.setState({key: this.state.key+1})}
          style={{fontSize: '20px', borderRadius: '50%', background: '#ffe', position: 'absolute', left: '10px', top: '30px', cursor: 'pointer', zIndex: 1000}}
        >{"\u21bb"}</button>
        <MatrixPair key={this.state.key} matrices={[this.state.matrix, this.state.nextMatrix]} />
        <ElementaryForm
          transforms={this.state.transforms}
          decorateLineNumber={this.decorateLineNumber}
          inputWidth={this.inputWidth()}
          change={this.change}
        />
        <div style={{marginBottom: '10px'}}>
          <button
            className={classes.Btn}
            onClick={this.save}
            disabled={this.shouldNotSave()}
          >Сохранить состояние</button>
        </div>
        <div>
          <ElementaryHistory
            items={this.state.chain}
            decorateLineNumber={this.decorateLineNumber}
          />
        </div>
      </div>
    );
  }
}

Elementary.propTypes = {
  matrix: PropTypes.arrayOf(PropTypes.array),
};

Elementary.defaultProps = {
  matrix: [[1,2,3],[4,5,6],[7,8,9]],
}

const mapDispatchToProps = dispatch => ({
  setError: (error) => dispatch(setCurrentError(error)),
  removeError: () => dispatch(removeCurrentError()),
});

export default connect(null, mapDispatchToProps)(Elementary);
