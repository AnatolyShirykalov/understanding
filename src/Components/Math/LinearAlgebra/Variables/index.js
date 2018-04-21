import React from "react";
import Variable from "./Variable";
import classes from "./index.css";

const variables = props => {
  return (
    <div className={classes.Wrap}>
      <table className={classes.Table}>
        <tbody>
          {Object.keys(props.variables).map(name => (
            <Variable
              name={name}
              variable={props.variables[name]}
              delete={() => props.delete(name)}
              key={name}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={props.add}>Добавить</button>
      </div>
    </div>
  );
};

export default variables;
