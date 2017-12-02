import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Containers/Pages/Home/Home';
import About from '../Containers/Pages/About/About';
import Article from '../Components/Demo/Article/Example';
import Task from '../Components/Demo/Task/Example';
import Diff from '../Components/Demo/Calculus/Diff/Example';

const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/examples/article" exact component={Article} />
    <Route path="/examples/task" exact component={Task} />
    <Route path="/about" component={About} />
    <Route path="/math/tasks/:taskId/" component={Diff} />
  </Switch>
)

export default routes;
