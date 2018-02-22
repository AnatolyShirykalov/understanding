import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => (
  <ul className={classes.NavItems}>
    <NavigationItem link="/lessons" exact>Уроки</NavigationItem>
    <NavigationItem link="/trainers" exact>Тренажёры</NavigationItem>
    <NavigationItem link="/tests" exact>Тесты</NavigationItem>
  </ul>
);

export default navigationItems;
