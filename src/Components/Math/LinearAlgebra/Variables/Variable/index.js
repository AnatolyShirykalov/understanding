import React from "react";
import LaTeX from "~/Components/UI/LaTeX";

const variable = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <LaTeX>{props.variable.value.latex()}</LaTeX>
      </td>
      {props.variable.removable ? (
        <td>
          <button onClick={props.delete}>Удалить</button>
        </td>
      ) : (
        <td />
      )}
    </tr>
  );
};

export default variable;
