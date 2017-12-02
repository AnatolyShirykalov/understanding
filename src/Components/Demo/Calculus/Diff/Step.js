import React from 'react';
import classes from './Example.css';
import MathPairs from './MathInput/MathPairs';
import NewChainRule from './NewChainRule';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
const step = props => (
  <div className={classes.Step}>
    <h4>{props.title}</h4>
    {props.methods && props.methods.length > 0 ?
    <Tabs selectedTabClassName={classes.Active}>
      <TabList>
        <Tab>Руками</Tab>
        <Tab>Методом</Tab>
      </TabList>
      <TabPanel>
        <MathPairs taskId={props.taskId} keys={props.keys} />
      </TabPanel>
      <TabPanel>
        <NewChainRule
          taskId={props.taskId}
          inputId={props.inputId}
        />
      </TabPanel>
      {props.children}
    </Tabs> :
        <MathPairs taskId={props.taskId} keys={props.keys} />
    }
  </div>
);

export default step;
