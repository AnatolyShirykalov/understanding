import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StepView from './StepView';
export const MatrixRoutes = () => {
  return (
    <Switch>
      <Route path="/trainers/matrix-elementary" exact component={StepView} />
    </Switch>
  );
}
