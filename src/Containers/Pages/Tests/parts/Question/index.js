// components/Question.js

import classes from './index.css'
import React from 'react'

const Question = ({image, text}) => {
  let content = '';
  if (image) {
    content = <img src={image} alt="question"/>
  } else if (text) {
    content = <div className={classes.questionText} dangerouslySetInnerHTML={{__html: text}}></div>
  }
  return (
    <div className={classes.question}>{content}</div>
  )
}

export default Question;

