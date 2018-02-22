import React from 'react'
import classes from './index.css'

const ResultBar = (props) => {
  return (
    <div className={classes.wrap}>
    <div className={classes.resultBar}>
      <span className={classes.right}>{props.right}</span>
      <span className={classes.wrong}>{props.wrong}</span>
      <span className={classes.rate}>{props.rate}</span>
    </div>
    </div>
  )
}

export default ResultBar;

