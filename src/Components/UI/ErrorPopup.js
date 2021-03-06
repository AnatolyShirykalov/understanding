import React from 'react';
import classes from './ErrorPopup.css';

const popup = props => (
  <div className={props.message ? classes.Popup : classes.Hide}>
    <div className={classes.Message}>{props.message}</div>
    <div className={classes.Closer} onClick={props.close}>{"\u02df"}</div>
  </div>
);

export default popup;
