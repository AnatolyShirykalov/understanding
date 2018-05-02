import React, { Component } from "react";
import ChangableFormula from "~/Components/UI/ChangableFormula";

const selects = {
  vector: [
    { name: "overline", func: arg => `\\overline{${arg}}` },
    { name: "vec", func: arg => `\\vec{${arg}}` },
    { name: "boldsymbol", func: arg => `\\boldsymbol{${arg}}` }
  ],
  diff: [
    { name: "italic frac", func: (f, x) => `\\frac{d ${f}}{ d ${x}}` },
    {
      name: "roman frac",
      func: (f, x) => `\\frac{\\mathrm{d} ${f}}{\\mathrm{d} ${x}}`
    },
    {
      name: "partial subscript",
      func: (f, x) => `\\partial_{${x}} ${f}`
    },
    {
      name: "comma",
      func: (f, x) => `${f}{}_{,${x}}`
    }
  ]
};

const f1 = {
  params: {
    rho: "\\rho",
    v: "v",
    t: "t",
    k: "k",
    P: "P",
    F: "F",
    vector: arg => `\\overline{${arg}}`,
    diff: (f, x) => `\\frac{d ${f}}{d ${x}}`
  },
  builder: ({ rho, v, vector, t, F, k, P, diff }) => {
    return `${rho}${diff(vector(v), t)}=${rho}${vector(
      F
    )}+\\nabla_{${k}}${vector(P)}{}^{${k}}`;
  },
  select: {
    vector: selects.vector,
    diff: selects.diff
  }
};
const f2 = {
  params: {
    rho: "\\rho",
    v: "v",
    j: "j",
    t: "t",
    F: "F",
    P: "P",
    k: "k",
    diff: (f, x) => `\\frac{ d ${f}}{d ${x}}`
  },
  builder: ({ rho, v, j, t, F, P, k, diff }) =>
    `${rho} ${diff(
      `${v}^{${j}}`,
      t
    )} = ${rho} ${`${F}^{${j}}`} + \\nabla_{${k}} ${P}^{${j} ${k}}`,
  select: { diff: selects.diff }
};

const f3 = {
  params: {
    rho: "\\rho",
    v: "v",
    j: "j",
    t: "t",
    F: "F",
    p: "p",
    k: "k",
    g: "g",
    tau: "\\tau",
    diff: (f, x) => `\\frac{ d ${f}}{d ${x}}`
  },
  builder: ({ rho, v, j, t, F, p, k, g, tau, diff }) =>
    `${rho} ${diff(
      `${v}^{${j}}`,
      t
    )} = ${rho} ${F}^{${j}} - ${g}^{${j} ${k}}\\nabla_{${k}} ${p}  + \\nabla_{${k}} ${tau}^{${j} ${k}}`,
  select: { diff: selects.diff }
};
const f4 = {
  params: {
    rho: "\\rho",
    v: "v",
    j: "j",
    t: "t",
    F: "F",
    p: "p",
    k: "k",
    g: "g",
    e: "e",
    lambda: "\\lambda",
    mu: "\\mu",
    div: arg => `\\mathrm{div}\\overline{${arg}}`,
    diff: (f, x) => `\\frac{ d ${f}}{d ${x}}`
  },
  builder: ({ rho, v, j, t, F, p, k, g, lambda, mu, e, div, diff }) =>
    `${rho} ${diff(
      `${v}^{${j}}`,
      t
    )} = ${rho} ${F}^{${j}} - ${g}^{${j} ${k}}\\nabla_{${k}} ${p}  + ${lambda} ${g}^{${j} ${k}}\\nabla_{${k}} ${div(
      v
    )} + 2 ${mu} \\nabla_{${k}} ${e}^{${j} ${k}}`,
  select: { diff: selects.diff }
};
export default class MTree extends Component {
  render() {
    return (
      <div>
        <h2>Универсальное уравнениу движения</h2>
        <ChangableFormula {...f1} />
        <ChangableFormula {...f2} />
        <ChangableFormula {...f3} />
        <ChangableFormula {...f4} />
      </div>
    );
  }
}
