import React, {Component} from 'react';
import classes from './Task.css';

class Example extends Component {
  state = {
    expression: {},
    children: []
  }
  render() {
    return (
      <div className={classes.Task}>
      </div>
    );
  }
}

export default Example;
