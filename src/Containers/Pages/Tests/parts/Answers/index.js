import classes from './index.css'
import React from 'react'
import Button from '../Button'

const Answers = ({answers, disabled, onClick}) => {
  return (
    <div className={classes.answers}>
      { answers.map( (answer) => {
        return (
          <Button
            {...answer}
            key={answer.id}
            right={disabled && answer.right}
            wrong={disabled && answer.wrong}
            disabled={disabled}
            onClick={() => onClick(answer.value)}
          />)
      })}
    </div>
  )
}
export default Answers;

