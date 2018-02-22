import React from 'react';
import Answers from '../Answers'
import Question from '../Question'

const visibleQuestion = params => {
  const {question} = params;
  return (
    <div className="app">
      <Question {...question}/>
      <Answers {...params}/>
    </div>
  )
}

export default visibleQuestion;
