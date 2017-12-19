import React from 'react';
import Base from '../Base';
import MathJax from '../../../vendor/react-mathjax/src';
import {schemas, toTeX, subExp, moves as mvs} from '../../../core/set/';
import classes from './Subexpr.css';

class Subexpr extends Base {
  state = {
    ex: schemas[0],
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
    return(
      <MathJax.Context>
        <div className={classes.Subexpr}>
          <h2>Выделяем подвыражение</h2>
          <MathJax.Node>{toTeX(this.state.ex)}</MathJax.Node>
          <MathJax.Node>{toTeX(cex)}</MathJax.Node>
          {allMoves.map(move=>(
            <div key={move} className={classes.ButtonWrap}><button
              className={classes[move]}
              onClick={moves[move] ? this.addMove(move) : null}
              disabled={!moves[move]}
            ></button></div>
          ))}
        </div>
      </MathJax.Context>
    );
  }
}

export default Subexpr;

