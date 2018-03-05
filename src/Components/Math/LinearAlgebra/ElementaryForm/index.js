import React from 'react';
import classes from './index.css';

const elementaryForm = ({transforms, decorateLineNumber, inputWidth, change}) => (
  <div>
    {transforms.map((t, i) => (
      <div key={i} className={classes.Item}>
        <span>
          {decorateLineNumber(i)}
        </span>
        <span className={classes.Operator}>
          {"\u27fc"}
        </span>
        <span>
          {decorateLineNumber(i)}
        </span>
        <span className={classes.Operator}>+</span>
        <input
          className={classes.Input}
          style={{width: inputWidth}}
          value={t.multiplicator}
          onChange={change("multiplicator", i)}
        />
        <span className={classes.Operator}>{"\u00d7"}</span>
        <select
          onChange={change("rowNumber", i)}
          value={t.rowNumber}
          className={classes.Select}
        >
          {transforms.map((_, j) =>(
            <option key={j} value={j} className={classes.Option}>
              {decorateLineNumber(j)}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>
);

export default elementaryForm;
