import React from "react";
import classes from "./index.css";

const incDec = props => {
  return (
    <button {...props} className={classes.Btn}>
      {props.children}
    </button>
  );
};

export default incDec;
