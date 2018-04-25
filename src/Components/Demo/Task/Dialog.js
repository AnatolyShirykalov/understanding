import React from 'react';
import classes from './Dialog.css';
import LaTeX from '~/Components/UI/LaTeX';

const withSP = cb => e => {
  e.stopPropagation();
  cb();
};
const dialog = props => (
  <div className={classes.Dialog}>
    <div onClick={props.closer} className={classes.Closer}>x</div>
    <h2>Что будем менять</h2>
    <div
      className={classes.Expression}
      onClick={()=>props.changer([])}
    >
      Само выражение: <LaTeX inline>
        {props.expression.current('A', 'B')}
      </LaTeX>
    </div>
    {props.expression.cannotChangeSubexpressionFirst() ? null :
        [<div
          key="1"
          className={classes.Left + ' ' + classes.Expression}
          onClick={() => props.changer(['left'])}
          >
          Левую часть: <LaTeX inline>
            {props.expression.leftPart('A', 'B')}
          </LaTeX>
          {props.expression.left.op ?
              <div className={classes.Deep} onClick={withSP(()=>props.deeper('left'))}>Глубже</div>
              : null}
        </div>,
          <div
            key="2"
            className={classes.Right + ' ' + classes.Expression}
            onClick={() => props.changer(['right'])}
          >
          Правую часть: <LaTeX inline>
            {props.expression.rightPart('A', 'B')}
          </LaTeX>
          {props.expression.right.op ?
              <div className={classes.Deep} onClick={withSP(()=>props.deeper('right'))}>Глубже</div>
              : null}
    </div>]
      }
  </div>
);

export default dialog;
