import React from 'react';
import classes from './Example.css';


const genTask = props => {
  if (props.parentId) return props.back;
  return (
    <div>{props.levels.map((level, i) => (
      <button className={classes.Example} onClick={props.newTask(i)} key={level}>
        {level}
      </button>
    ))}</div>
  );
};

export default genTask;
