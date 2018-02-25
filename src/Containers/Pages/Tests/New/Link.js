import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Link.css';
const link = props => (
  <NavLink to="/tests/new">
    <div className={classes.Wrap}>
      <div className={classes.New}>
        Создать новый тест
      </div>
    </div>
  </NavLink>
);

export default link;
