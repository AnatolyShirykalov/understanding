import React from 'react';
import Base from '../Base';
import LaTeX from '~/Components/UI/LaTeX';
import {schemas, toTeX, subExp, moves as mvs} from '../../../core/set/';
import classes from './Subexpr.css';

class Subexpr extends Base {
  state = {
    ex: this.props.ex || schemas[0],
    moves: [],
  };

  addMove = move => () => {
    let moves;
    const old = this.state.moves;
    if(move === 'up') moves = old.slice(0, old.length - 1);
    else moves = [...old, move];
    this.setState({moves});
  }

  render(){
    const cex = subExp(this.state.ex, this.state.moves);
    const moves = mvs(cex);
    const allMoves = ['up', 'left', 'down', 'right'];
    if (this.state.moves.length > 0) moves['up'] = 1;
    return (
      <div className={classes.Subexpr}>
        <h4>{this.props.title}</h4>
        <div className={classes.Preview}>
          <LaTeX>{toTeX(cex)}</LaTeX>
        </div>
        {allMoves.map(move=>(
          <div key={move} className={classes.ButtonWrap + ' ' + classes['button'+move]}><button
            className={classes[move]}
            onClick={moves[move] ? this.addMove(move) : null}
            disabled={!moves[move]}
          ></button></div>
        ))}
        <div className={classes.Done}>
          <button
            onClick={() => this.props.done(this.state.moves)}
            disabled={!this.props.done}
          >
            Done
          </button>
          <button
            onClick={this.props.cancel}
            disabled={!this.props.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default Subexpr;

