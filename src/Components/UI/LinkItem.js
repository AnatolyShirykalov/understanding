import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './LinkItem.css';

const linkItem = props => (
  <div className={classes.Item}>
    <NavLink to={props.to} exact>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </NavLink>
  </div>
);

export default linkItem;
