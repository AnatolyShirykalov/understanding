import React from 'react'
import classes from './index.css'

const NextQuestionButton = props => {
  return (
    <button
      onClick={props.onClick}
      className={classes.nextQuestion}
      disabled={props.disabled}
    >
      {props.text || "Следующий вопрос"}
    </button>
  );
}

export default NextQuestionButton;
