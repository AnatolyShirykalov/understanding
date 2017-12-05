import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => (
  <ul className={classes.NavItems}>
    <NavigationItem link="/math/tasks/common/commoninit" exact>Производная</NavigationItem>
    <NavigationItem link="/math/tasks/chain/chaininit" exact>Chain</NavigationItem>
    <NavigationItem link="/math/tasks/prod/prodinit" exact>Лейбниц</NavigationItem>
    <NavigationItem link="/examples/task">Sets</NavigationItem>
  </ul>
);

export default navigationItems;
