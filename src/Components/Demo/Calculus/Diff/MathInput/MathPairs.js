import React from 'react';
import MathInput from './MathInput';
import MathPreview from './MathPreview';
import classes from './MathPairs.css';

const mathPairs = props => props.keys.map((key, i) => (
  <div className={classes.Pair} key={key}>
    <MathInput
      className={classes.InputWrap}
      inputClassName={classes.Input}
      label={key}
      inputId={key}
      autoFocus={i===0}
      taskId={props.taskId}
    />
    <MathPreview
      taskId={props.taskId}
      className={classes.Preview}
      inputId={key}/>
  </div>
));

export default mathPairs;
