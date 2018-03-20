import React from 'react';

const row = props => (
  <div>
    <h3>Номер столбца с первым ненулевым элементом в {props.i}-й строке</h3>
    <input type="number" min="0" max={props.m} value={props.firstNonZero} onChange={props.changeFirstNonZero}></input>
  </div>
);

export default row;
