// Button.js
import classes from './index.css'
import React from 'react'
import _ from 'lodash'

const Button = (props) => {
  const {disabled, value, onClick} = props;
  const className = _.intersection(
    ['active', 'right', 'wrong'],
    _.keys(_.pickBy(props, _.identity))
  ).map(k=>classes[k]).join(" ") + ' ' + classes.btn;
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      dangerouslySetInnerHTML={{__html: value}}
    >
    </button>
  );
}
export default Button;
