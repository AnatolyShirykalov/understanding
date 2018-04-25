import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ubd, toTeX} from '../../../core/set/';
import Equal from '../Set/Equal';
import classes from './Set.css';
import {setDoneEqual} from '../../../store/actions';
import LaTeX from '~/Components/UI/LaTeX';

class SetLesson extends Component {
  state = {
    tasks:ubd.map(pair=>({
      exs: pair,
      done: false,
      inProcess: false,
    })),
  }

  setTask = (i, obj) => {
    this.setState({
      tasks: this.state.tasks.map(
        (task, j)=>i===j?{...task, ...obj}: task
      ),
    });
  }

  setInProcess = i => this.setTask(i, {inProcess: true});

  done = i => this.setTask(i, {done: true, inProcess: false});
  cancel = i => this.setTask(i, {inProcess: false});

  render() {
    return (
        <div>
          {this.state.tasks.map((task, key)=>(
            <div key={key} className={classes.Task}>
              <LaTeX>
                {task.exs.map(toTeX).join(' = ')}
              </LaTeX>
              {task.done ? <div>Сделано</div> :
                  task.inProcess ?
                    <Equal
                      exs={task.exs}
                      done={() => this.done(key)}
                      cancel={()=> this.cancel(key)}
                    />
                  :
                    <div>
                      <button onClick={() =>this.setInProcess(key)}>
                        Доказывать
                      </button>
                    </div>
               }
            </div>
          ))}
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  proved: exs=>dispatch(setDoneEqual(exs))
});

export default connect(null, mapDispatchToProps)(SetLesson);
