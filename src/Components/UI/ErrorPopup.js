import React from 'react';
import classes from './ErrorPopup.css';

const popup = props => (
  <div className={classes.Popup}>
    <div className={classes.Message}>{props.message}</div>
    <div className={classes.Closer} onClick={props.close}>X</div>
  </div>
);

export default popup;
