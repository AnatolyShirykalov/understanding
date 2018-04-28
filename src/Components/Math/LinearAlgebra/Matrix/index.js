import React from "react";
import classes from "./index.css";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";

const Matrix = ({ matrix }) => {
  try {
    const m = matrix.map(row => row.map(c => (c === "" ? 0 : c)));
    return (
      <LaTeX className={classes.Matrix}>{new NerdMatrix(m).latex()}</LaTeX>
    );
  } catch (error) {
    return <div>{error.message}</div>;
  }
};

export default Matrix;
