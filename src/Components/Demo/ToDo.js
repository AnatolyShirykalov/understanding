import React from "react";
import LaTeX from "~/Components/UI/LaTeX";
import classes from "./ToDo.css";

const toDo = props => (
  <div className={classes.ToDo}>
    <h4>
      <span>{props.header}</span>
      {props.texPostfix ? <LaTeX inline>{props.texPostfix}</LaTeX> : null}
      {props.textPostfix ? <span>{props.textPostfix}</span> : null}
    </h4>
    {Array.isArray(props.tex) ? (
      <div>
        {props.tex.map((tex, key) => (
          <span className={classes.TeX} key={key}>
            <LaTeX inline>{tex}</LaTeX>
          </span>
        ))}
      </div>
    ) : (
      <LaTeX>{props.tex}</LaTeX>
    )}
  </div>
);

export default toDo;
