import React from "react";
import classes from "./index.css";
import { NerdMatrix } from "~/core/math/linearAlgebra";
import LaTeX from "~/Components/UI/LaTeX";

const Matrix = ({ matrix }) => (
  <LaTeX className={classes.Matrix}>{new NerdMatrix(matrix).latex()}</LaTeX>
);

export default Matrix;
