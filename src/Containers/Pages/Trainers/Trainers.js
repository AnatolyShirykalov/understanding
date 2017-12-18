import React from 'react';
import LinkItem from '../../../Components/UI/LinkItem';

const trainers = props => (
  <div>
    <LinkItem
      to="/math/tasks/common/commoninit"
      title="Производная: задания общего типа"
      description="Задача найти производную, используя любые методы сколь угодно много раз. Для использования метода нужно просто нажать на кнопку его использования"
    />
    <LinkItem
      to="/math/tasks/chain/chaininit"
      title="Производная: метод сложной функции"
      description="Задача найти производную сложной функции, композиции двух или более простейших элементарных. В заданиях может потребоваться использование метода дважды, трижды, многожды."
    />
    <LinkItem
      to="/math/tasks/prod/prodinit"
      title="Производная: правило Лейбница"
      description="Задача найти производную произведения функций, используя правило Лейбница."
    />
    <LinkItem
      to="/math/tasks/inverse/inverseinit"
      title="Производная: метод обратной функции"
      description="Задача найти производную обратной функции, используя соответствующее правило."
    />
    <LinkItem
      to="/examples/task"
      title="Sets"
      description="Ещё в разработке"
    />
  </div>
)

export default trainers;

