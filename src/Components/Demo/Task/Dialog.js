import React from 'react';
import classes from './Dialog.css';
import MathJax from '../../../vendor/react-mathjax/src';

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
      Само выражение: <MathJax.Node inline>
        {props.expression.current('A', 'B')}
      </MathJax.Node>
    </div>
    {props.expression.cannotChangeSubexpressionFirst() ? null :
        [<div
          key="1"
          className={classes.Left + ' ' + classes.Expression}
          onClick={() => props.changer(['left'])}
          >
          Левую часть: <MathJax.Node inline>
            {props.expression.leftPart('A', 'B')}
          </MathJax.Node>
          {props.expression.left.op ?
              <div className={classes.Deep} onClick={withSP(()=>props.deeper('left'))}>Глубже</div>
              : null}
        </div>,
          <div
            key="2"
            className={classes.Right + ' ' + classes.Expression}
            onClick={() => props.changer(['right'])}
          >
          Правую часть: <MathJax.Node inline>
            {props.expression.rightPart('A', 'B')}
          </MathJax.Node>
          {props.expression.right.op ?
              <div className={classes.Deep} onClick={withSP(()=>props.deeper('right'))}>Глубже</div>
              : null}
    </div>]
      }
  </div>
);

export default dialog;
