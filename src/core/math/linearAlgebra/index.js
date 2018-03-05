import math from 'mathjs';
import _ from 'lodash';

export const genMatrix = ({square, M, N}={}) => {
  const n = M || _.random(4, 7);
  const m = N || (square ? n :_.random(2, n));
  if (m > n) throw new Error("Строк больше чем столбцов");
  return _.times(m, () => {
    return _.times(n, () => _.random(-20, 20))
  })

}

export class Matrix {
  constructor(matrix){
    if (math.typeof(matrix) === 'Matrix') {
      this.matrix = matrix;
      return;
    }
    this.matrix = math.matrix(matrix);
  }
  getRow(i){
    return this.matrix.subset(math.index(i, math.range(0, this.matrix.size()[1])));
  }
  setRow(i, row) {
    return this.matrix.subset(
      math.index(i, math.range(0, this.matrix.size()[1])),
      row,
    );
  }
  e1(changedRowNumber, {rowNumber, multiplicator}){
    const mData = this.matrix.clone();
    const matrix = new Matrix(mData._data);
    if (multiplicator === 0 || !multiplicator || multiplicator === '') return matrix;
    if (multiplicator !== -1 && changedRowNumber === rowNumber)
      throw new Error('Нельзя вычитать из строки ту же строку');
    const row = math.multiply(matrix.getRow(rowNumber), multiplicator);
    const sum = math.add(row, matrix.getRow(changedRowNumber));
    matrix.setRow(changedRowNumber, sum);
    return matrix;
  }
  e1s(transforms) {
    const changed = {};
    transforms.forEach((t, i) => {
      const m = t.multiplicator;
      if(m && m !== 0 && m !== '0' && m !== ''){
        if(changed[t.rowNumber])
          throw new Error(`Нельзя использовать уже изменённую строку`);
        changed[i] = true;
      }
    });
    return transforms.reduce((m, t, i) => m.e1(i, t), this);
  }
  isEqual(m2) {
    let ret = true;
    this.matrix.forEach((v, i)=>{
      if (m2.matrix.subset(math.index(...i)) !== v) ret = false;
    });
    return ret;
  }
}

