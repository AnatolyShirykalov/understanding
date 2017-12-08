import {Component} from 'react';

class Base extends Component {
  withTaskId = prop => this.props[prop](this.taskId());

  taskId = () => this.props.taskId ||
    (this.props.match && this.props.match.params.taskId);
}

export const withTIC = section => prop => taskId =>
  section[taskId] && section[taskId][prop];


export default Base;
