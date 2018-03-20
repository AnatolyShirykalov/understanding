import React from 'react';
import LinkItem from '~/Components/UI/LinkItem';

const trainers = props => (
  <div>
    <LinkItem to="/trainers/diff" title="Дифференцирование" />
    <LinkItem to="/trainers/matrix" title="Матрицы" />
    <LinkItem
      to="/trainers/subexpr"
      title="Подвыражения"
    />
    <LinkItem
      to="/examples/task"
      title="Sets"
      description="Ещё в разработке"
    />
  </div>
)

export default trainers;

