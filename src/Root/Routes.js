import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../Containers/Pages/Home/Home';
import About from '../Containers/Pages/About/About';
import Article from '../Components/Demo/Article/Example';
import Task from '../Components/Demo/Task/Example';
import Chain from '../Components/Demo/Calculus/Diff/Chain';
import DiffTable from '../Components/Demo/Calculus/Diff/Table/Table';
import DiffAdd from '../Components/Demo/Calculus/Diff/Add';
import DiffProd from '../Components/Demo/Calculus/Diff/Prod';
import DiffInverse from '../Components/Demo/Calculus/Diff/Inverse';
import DiffCommon from '../Components/Demo/Calculus/Diff/Common';
import BoolTable from '../Components/Demo/Bool/Table';
import BoolEval from '../Components/Demo/Bool/Eval';
import BoolEqual from '../Components/Demo/Bool/Equal';
import Lesson from '../Components/Demo/Lesson/Lesson';
import SetLesson from '../Components/Demo/Lesson/Set';
import Lessons from '../Containers/Pages/Lessons/Lessons';
import Trainers from '../Containers/Pages/Trainers/Trainers';
import Subexpr from '../Components/Demo/Set/Subexpr';

import {TestRoutes} from '../Containers/Pages/Tests';
import {MatrixRoutes} from '~/Containers/Pages/Math/Matrix';

const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/examples/article" exact component={Article} />
    <Route path="/examples/task" exact component={Task} />
    <Route path="/about" component={About} />
    <Route path="/math/tasks/chain/:taskId/" component={Chain} />
    <Route path="/math/tasks/table/:taskId/" component={DiffTable} />
    <Route path="/math/tasks/add/:taskId/" component={DiffAdd} />
    <Route path="/math/tasks/prod/:taskId/" component={DiffProd} />
    <Route path="/math/tasks/inverse/:taskId/" component={DiffInverse} />
    <Route path="/math/tasks/common/:taskId/" component={DiffCommon} />
    <Route path="/math/tasks/booltable/:taskId/" component={BoolTable} />
    <Route path="/math/tasks/booleval/:taskId/" component={BoolEval} />
    <Route path="/math/tasks/boolequal/:taskId/" component={BoolEqual} />
    <Route path="/math/tasks/lesson/:taskId/" component={Lesson} />
    <Route path="/lessons/2" component={SetLesson} />
    <Route path="/lessons" component={Lessons} />
    <Route path="/trainers/subexpr" component={Subexpr} exact/>
    <Route path="/trainers" exact component={Trainers} />
    <MatrixRoutes />
    <TestRoutes/>
  </Switch>
)

export default routes;
