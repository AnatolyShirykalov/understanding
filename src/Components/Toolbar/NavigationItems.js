import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => (
  <ul className={classes.NavItems}>
    <NavigationItem link="/" exact>Chain rule</NavigationItem>
    <NavigationItem link="/examples/task">Sets</NavigationItem>
  </ul>
);

export default navigationItems;
