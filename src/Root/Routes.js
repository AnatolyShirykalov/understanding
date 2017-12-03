import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Containers/Pages/Home/Home';
import About from '../Containers/Pages/About/About';
import Article from '../Components/Demo/Article/Example';
import Task from '../Components/Demo/Task/Example';
import Chain from '../Components/Demo/Calculus/Diff/Chain';
import DiffTable from '../Components/Demo/Calculus/Diff/Table/Table';
import DiffAdd from '../Components/Demo/Calculus/Diff/Add';
import DiffCommon from '../Components/Demo/Calculus/Diff/Common';

const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/examples/article" exact component={Article} />
    <Route path="/examples/task" exact component={Task} />
    <Route path="/about" component={About} />
    <Route path="/math/tasks/chain/:taskId/" component={Chain} />
    <Route path="/math/tasks/table/:taskId/" component={DiffTable} />
    <Route path="/math/tasks/add/:taskId/" component={DiffAdd} />
    <Route path="/math/tasks/common/:taskId/" component={DiffCommon} />
  </Switch>
)

export default routes;
