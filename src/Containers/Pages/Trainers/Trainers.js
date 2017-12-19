import React from 'react';
import LinkItem from '../../../Components/UI/LinkItem';

const trainers = props => (
  <div>
    <LinkItem
      to="/math/tasks/common/commoninit"
      title="Производная: задания общего типа"
    />
    <LinkItem
      to="/math/tasks/chain/chaininit"
      title="Производная: метод сложной функции"
    />
    <LinkItem
      to="/math/tasks/prod/prodinit"
      title="Производная: правило Лейбница"
    />
    <LinkItem
      to="/math/tasks/inverse/inverseinit"
      title="Производная: метод обратной функции"
    />
    <LinkItem
      to="/examples/task"
      title="Sets"
      description="Ещё в разработке"
    />
    <LinkItem
      to="/trainers/subexpr"
      title="Подвыражения"
    />
  </div>
)

export default trainers;

