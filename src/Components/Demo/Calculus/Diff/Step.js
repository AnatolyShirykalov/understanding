import React from 'react';
import classes from './Step.css';
import MathPairs from './MathInput/MathPairs';
import NewTask from './NewTask';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
const step = props => (
  <div className={classes.Step}>
    <h4>{props.title}</h4>
    {props.keys.length === 1 && props.methods && props.methods.length > 0 ?
    <Tabs selectedTabClassName={classes.Active}>
      <TabList>
        <Tab>Руками</Tab>
        <Tab>Методом</Tab>
      </TabList>
      <TabPanel>
        <MathPairs taskId={props.taskId} keys={props.keys} />
      </TabPanel>
      <TabPanel>
        {props.methods.map(kind => (
          <NewTask
            taskId={props.taskId}
            inputId={props.inputId}
            parentInputId={props.keys[0]}
            parentInputKind={props.kind}
            kind={kind}
            key={kind}
          />
        ))}
      </TabPanel>
      {props.children}
    </Tabs> :
        <MathPairs taskId={props.taskId} keys={props.keys} />
    }
  </div>
);

export default step;
