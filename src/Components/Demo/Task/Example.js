import React, {Component} from 'react';
import MathJax from '../../../vendor/react-mathjax/src';
import classes from './Task.css';
import {example} from '../../../core/example';
import Dialog from './Dialog';

class Example extends Component {
  state = {
    expression: example,
    dialog: null,
    what: [],
    children: []
  }

  toggleDialog = () => {
    this.setState({
      dialog: this.state.dialog ? null : this.state.expression,
      what: [],
    });
  }

  deeperDialog = (what) => {
    this.setState({
      what: [...this.state.what, what],
      dialog: this.state.dialog[what]
    });
  }

  changeExpression = (what=[]) => {
    console.log('changeExpression', what);
    this.setState({
      dialog: null,
      expression: this.state.expression.transform([...this.state.what, ...what]),
      children: [...this.state.children, this.state.expression],
      what: [],
    })
  }

  render() {
    let dialog = null;
    if(this.state.dialog) dialog = (
      <Dialog
        closer={this.toggleDialog}
        changer={this.changeExpression}
        expression={this.state.dialog}
        deeper={this.deeperDialog}
      />
    );
    return (
      <MathJax.Context>
        <div className={classes.Task}>
          <h2>Демонстрационная версия конструктора</h2>
          <p>Доступны только преобразования «по определению»</p>
          {dialog}
          <div className={classes.Current} onClick={this.toggleDialog}>
            <MathJax.Node>{this.state.expression.text()}</MathJax.Node>
          </div>
          <div>
            {this.state.children.map((child, i)=>(
              <div key={i}>
                <MathJax.Node>{child.text()}</MathJax.Node>
              </div>
            ))}
          </div>
        </div>
      </MathJax.Context>
    );
  }
}

export default Example;
