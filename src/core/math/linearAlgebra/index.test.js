import * as Structures from '.';

describe('Structures', () => {
  describe('Matrixes', () => {
    let data;
    beforeEach(()=>data=[[1,2,3],[4,5,6],[7,8,9]]);
    it('should be created', () => {
      const mat = new Structures.Matrix(data);
      expect(mat.matrix._data).toEqual(data);
    });
    it('should implement getRow', () => {
      const m = new Structures.Matrix(data);
      expect(m.getRow(1)._data).toEqual([data[1]]);
    });
    it('should implement setRow', () => {
      const m = new Structures.Matrix(data);
      expect(m.setRow(1, m.getRow(0))._data).toEqual([[1,2,3], [1,2,3], [7,8,9]]);
    });
    it('should implement e1', () => {
      const m1 = new Structures.Matrix(data);
      const m2 = m1.e1(0, {rowNumber: 1, multiplicator: 2});
      expect(m2.matrix._data).toEqual([[9, 12, 15], [4,5,6], [7,8,9]]);
    });
    it('should implement e1s', () => {
      const m1 = new Structures.Matrix(data);
      const m2 = m1.e1s([
        {rowNumber: 0, multiplicator: 0},
        {rowNumber: 0, multiplicator: -1},
        {rowNumber: 0, multiplicator: -1},
      ]);
      expect(m2.matrix._data).toEqual([[1,2,3], [3,3,3], [6,6,6]]);
    });
  });
  describe('genMatrix', () => {
    it('should gen matrix', () => {
      const data = Structures.genMatrix();
      const m = new Structures.Matrix(data);
      expect(Array.isArray(data)).toBe(true);
      expect(m instanceof Structures.Matrix).toBe(true);
    });
  });
});
