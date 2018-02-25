import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Tests from './Tests';
import Test from './Test';
import New from './New';

export const TestRoutes = () => (
  <Switch>
    <Route path="/tests" exact component={Tests} />
    <Route path="/tests/new" exact component={New} />
    <Route path="/tests/:id" component={Test} />
  </Switch>
);
