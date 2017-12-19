import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './LinkItem.css';

const linkItem = props => (
  <NavLink to={props.to} className={classes.Link} exact>
    <div className={classes.Item}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  </NavLink>
);

export default linkItem;
