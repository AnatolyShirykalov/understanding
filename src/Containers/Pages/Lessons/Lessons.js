import React from 'react';
import LinkItem from '../../../Components/UI/LinkItem';

const lessons = props => (
  <div>
    <LinkItem to="/math/tasks/lesson/lessoninit" title="Базовые булевы равенства"/>
    <LinkItem to="/lessons/2" title="Базовые знания об операциях над множествами"/>
  </div>
)

export default lessons;
