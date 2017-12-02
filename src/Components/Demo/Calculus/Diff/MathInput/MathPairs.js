import React, {Component} from 'react';
import MathInput from './MathInput';
import MathPreview from './MathPreview';
import classes from './MathPairs.css';
import PropTypes from 'prop-types';

class MathPairs extends Component {
  render() {
    return this.props.keys.map((key, i)=>(
      <div className={classes.Pair} key={key}>
        <MathInput
          className={classes.InputWrap}
          inputClassName={classes.Input}
          label={key}
          inputId={key}
          autoFocus={i===0}
          taskId={this.props.taskId}
        />
        <MathPreview
          taskId={this.props.taskId}
          className={classes.Preview}
          inputId={key}/>
      </div>
    ));
  }
}

MathPairs.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  taskId: PropTypes.string.isRequired,
}

export default MathPairs;
