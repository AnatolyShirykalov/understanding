import React from 'react';
import classes from './Input.css';

const Input = ({ind, name, title, data, change, tag, options}) => {
  let inp = (
    <input className={classes.Input} id={ind+name} value={data[name]} onChange={change(ind, name)} />
  );
  if(tag === 'select') {
    inp = (
      <select className={classes.Select} id={ind+name} onChange={change(ind, name)}>
        {options.map(type=>(
          <option className={classes.Option} key={type} value={type}>{type}</option>
        ))}
      </select>
    );
  }
  return (
    <div className={classes.Wrapper}>
      <label className={classes.Label} htmlFor={ind+name}>{title}</label>
      {inp}
    </div>
  )
}

export default Input;
