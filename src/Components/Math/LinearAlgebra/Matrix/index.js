import React from "react";
import classes from "./index.css";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";

const Matrix = ({ matrix }) => {
  try {
    return (
      <LaTeX className={classes.Matrix}>{new NerdMatrix(matrix).latex()}</LaTeX>
    );
  } catch (error) {
    return <div>{error.message}</div>;
  }
};

export default Matrix;
