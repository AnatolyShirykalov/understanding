import nerdamer from "nerdamer";
import "nerdamer/all";
import { times } from "lodash";

const nerdFromRoots = (roots, x = "x") => {
  return nerdamer(roots.map(root => `(${x} - ${root})`).join("*"));
};

const nerdFromCoeffs = (coeffs, x = "x") => {
  return nerdamer(
    coeffs
      .map((c, k) => {
        const coeff = c === "" || typeof c === "undefined" ? 0 : c;
        return `(${coeff}) * ${x}^${k}`;
      })
      .join("+")
  );
};

export class Polynom {
  constructor({ roots, x, coeffs }) {
    this.x = x || "x";
    if (roots) {
      this.polynom = nerdFromRoots(roots, this.x);
      this.n = roots.length;
    }
    if (coeffs) {
      this.polynom = nerdFromCoeffs(coeffs, this.x);
      this.n = coeffs.length - 1;
    }
  }
  coeffs() {
    return [
      this.polynom.evaluate({ [this.x]: 0 }).text(),
      ...times(this.n, () => true).map((a, i) => {
        return nerdamer
          .diff(this.polynom, this.x, i + 1)
          .evaluate({ [this.x]: 0 })
          .divide(nerdamer.factorial(i + 1))
          .text();
      })
    ];
  }
  latex() {
    return this.polynom.expand().latex();
  }
  asProd() {
    return this.polynom.latex();
  }
}
