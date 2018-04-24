import React from "react";
import LinkItem from "~/Components/UI/LinkItem";

const MatrixMenu = props => (
  <div>
    <LinkItem to="/trainers/is-step-view" title="Ступенчатый вид" />
    <LinkItem
      to="/trainers/matrix-elementary"
      title="Элементарные преобразования матриц"
    />
    <LinkItem to="/trainers/matrix-dot" title="Умножение матриц" />
  </div>
);

export default MatrixMenu;
