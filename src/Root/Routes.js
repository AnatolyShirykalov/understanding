import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Containers/Pages/Home/Home';
import About from '../Containers/Pages/About/About';

const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" component={About} />
  </Switch>
)

export default routes;
