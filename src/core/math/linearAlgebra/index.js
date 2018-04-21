import math from "mathjs";
import _ from "lodash";
import nerdamer from "nerdamer";

const randNonZero = (r = 20) => {
  let ret = 0;
  while (ret === 0) {
    ret = _.random(-r, r);
  }
  return ret;
};

export const genVector = ({ length } = {}) => {
  const r = 20;
  const maxL = 8;
  const minL = 2;
  const l = length || _.random(minL, maxL);
  return _.times(l, () => _.random(-r, r));
};

const genStepMatrix = (m, n, r = 20) => {
  if (n < m) throw new Error("n>m is not implemented yet");
  const fNZ = _.sampleSize(_.times(n, i => i), m).sort();
  return _.times(m, i => {
    return [
      ..._.times(fNZ[i], () => 0),
      ..._.times(n - fNZ[i], () => randNonZero(r))
    ];
  });
};

const genAlmostStepMatrix = (m, n, r) => {
  if (n < m) throw new Error("n>m is not implemented yet");
  const fNZ = _.sampleSize(_.times(n, i => i), m).sort();
  const ret = _.times(m, i => {
    return [
      ..._.times(fNZ[i], () => 0),
      ..._.times(n - fNZ[i], () => randNonZero(r))
    ];
  });
  let j = _.random(1, 3);
  while (j > 0) {
    const i = _.random(0, m - 1);
    if (fNZ[i] === 0) {
      j += 1;
      continue;
    }
    ret[i][fNZ[i] - 1] = randNonZero(r);
    j -= 1;
  }
  return ret;
};

export const genMatrix = ({ square, M, N, R, step } = {}) => {
  const n = M || _.random(4, 7);
  const m = N || (square ? n : _.random(2, n));
  const r = R || 20;
  if (typeof step === "number") {
    if (step > 0.5) return genStepMatrix(m, n, r);
    return genAlmostStepMatrix(m, n, r);
  }
  return _.times(m, () => {
    return _.times(n, () => _.random(-r, r));
  });
};

export class Scalar {
  constructor(v) {
    if (v instanceof nerdamer.getCore().Expression) {
      this.value = v;
      return;
    }
    this.value = nerdamer(v);
  }
  data() {
    return this.value.text();
  }
  latex() {
    return this.value.latex();
  }
  subtract(v) {
    return new Scalar(this.value.subtract(v.value));
  }
}

export class Vector {
  constructor(v) {
    this.vector = nerdamer.vector(...v);
  }
  data() {
    return this.vector.text();
  }
  latex() {
    return this.vector.latex();
  }
  dot(v) {
    return new Scalar(nerdamer.dot(this.vector, v.vector));
  }
}

class AbstractMatrix {
  e1s(transforms) {
    const changed = {};
    transforms.forEach((t, i) => {
      const m = t.multiplicator;
      if (m && m !== 0 && m !== "0" && m !== "") {
        if (changed[t.rowNumber])
          throw new Error(`Нельзя использовать уже изменённую строку`);
        changed[i] = true;
      }
    });
    return transforms.reduce((m, t, i) => m.e1(i, t), this);
  }
}

export class NerdMatrix extends AbstractMatrix {
  constructor(matrix) {
    super();
    if (matrix instanceof nerdamer.getCore().Expression) {
      this.matrix = matrix;
      return;
    }
    if (matrix instanceof NerdMatrix) {
      this.matrix = matrix.matrix;
      return;
    }
    if (!Array.isArray(matrix)) throw new Error("Unknown type of argument");
    this.matrix = nerdamer.matrix(...matrix);
  }

  data() {
    return this.matrix.symbol.elements.map(row => {
      if (Array.isArray(row)) return row.map(e => e.text());
      throw new Error("unexpected type of row");
    });
  }

  getRow(i) {
    return new NerdMatrix(nerdamer.matgetrow(this.matrix, i));
  }

  setRow(i, row) {
    const m = new NerdMatrix(this.matrix);
    let r = row;
    if (r instanceof NerdMatrix) r = nerdamer.vector(...row.data()[0]);
    return new NerdMatrix(nerdamer.matsetrow(m.matrix, i, r));
  }
  e1(changedRowNumber, { rowNumber, multiplicator }) {
    const mData = this.data();
    const matrix = new NerdMatrix(mData);
    if (multiplicator === 0 || !multiplicator || multiplicator === "")
      return matrix;
    if (multiplicator !== -1 && changedRowNumber === rowNumber)
      throw new Error("Нельзя вычитать из строки ту же строку");
    const row = matrix.getRow(rowNumber).matrix.multiply(multiplicator);
    const sum = new NerdMatrix(matrix.getRow(changedRowNumber).matrix.add(row));
    return matrix.setRow(changedRowNumber, sum);
  }
  isEqual(m2) {
    let ret = true;
    this.matrix.subtract(m2.matrix).each(v => {
      if (v.text() !== "0") ret = false;
    });
    return ret;
  }
  isStep() {
    let first = -1;
    for (let row of this.data()) {
      let ret;
      for (ret = 0; ret < row.length && +row[ret] === 0; ret++);
      if (first >= ret) return false;
      first = ret;
    }
    return true;
  }
  latex() {
    return this.matrix.latex().replace(/vmatrix/g, "pmatrix");
  }
}

export class Matrix extends AbstractMatrix {
  constructor(matrix) {
    super();
    if (math.typeof(matrix) === "Matrix") {
      this.matrix = matrix;
      return;
    }
    this.matrix = math.matrix(matrix);
  }

  data() {
    return this.matrix._data;
  }
  getRow(i) {
    return this.matrix.subset(
      math.index(i, math.range(0, this.matrix.size()[1]))
    );
  }
  setRow(i, row) {
    return this.matrix.subset(
      math.index(i, math.range(0, this.matrix.size()[1])),
      row
    );
  }
  e1(changedRowNumber, { rowNumber, multiplicator }) {
    const mData = this.matrix.clone();
    const matrix = new Matrix(mData._data);
    if (multiplicator === 0 || !multiplicator || multiplicator === "")
      return matrix;
    if (multiplicator !== -1 && changedRowNumber === rowNumber)
      throw new Error("Нельзя вычитать из строки ту же строку");
    const row = math.multiply(matrix.getRow(rowNumber), multiplicator);
    const sum = math.add(row, matrix.getRow(changedRowNumber));
    matrix.setRow(changedRowNumber, sum);
    return matrix;
  }

  isEqual(m2) {
    let ret = true;
    this.matrix.forEach((v, i) => {
      if (m2.matrix.subset(math.index(...i)) !== v) ret = false;
    });
    return ret;
  }
  isStep() {
    let first = -1;
    for (let row of this.matrix._data) {
      let ret;
      for (ret = 0; ret < row.length && row[ret] === 0; ret++);
      if (first >= ret) return false;
      first = ret;
    }
    return true;
  }
}
