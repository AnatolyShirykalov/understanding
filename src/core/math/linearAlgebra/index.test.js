import * as Structures from ".";

describe("Structures", () => {
  describe("Matrixes", () => {
    let data;
    beforeEach(() =>
      (data = [["1", "2", "3+i"], ["4", "5", "6"], ["7", "8", "9"]]));
    it("should be able to created", () => {
      const mat = new Structures.NerdMatrix(data);
      expect(mat.data()).toEqual(data);
      const m2 = new Structures.NerdMatrix(mat.matrix);
      expect(m2.data()).toEqual(data);
      const m3 = new Structures.NerdMatrix(mat);
      expect(m3.data()).toEqual(data);
    });
    it("should implement data()", () => {
      const m = new Structures.NerdMatrix([[1], [2]]);
      expect(m.data()).toEqual([["1"], ["2"]]);
      const m1 = new Structures.NerdMatrix([[1, 2]]);
      expect(m1.data()).toEqual([["1", "2"]]);
    });
    it("should implement getRow", () => {
      const m = new Structures.NerdMatrix(data);
      expect(m.getRow(1).data()).toEqual([data[1]]);
    });
    it("should implement setRow", () => {
      const m = new Structures.NerdMatrix(data);
      expect(m.setRow(1, m.getRow(0)).data()).toEqual([
        ["1", "2", "3+i"],
        ["1", "2", "3+i"],
        ["7", "8", "9"]
      ]);
    });
    it("should implement e1", () => {
      const m1 = new Structures.NerdMatrix(data);
      const m2 = m1.e1(0, { rowNumber: 1, multiplicator: "i" });
      expect(m2.data()).toEqual([
        ["1+4*i", "2+5*i", "3+7*i"],
        ["4", "5", "6"],
        ["7", "8", "9"]
      ]);
    });
    it("should implement e1s", () => {
      const m1 = new Structures.NerdMatrix(data);
      const m2 = m1.e1s([
        { rowNumber: 0, multiplicator: 0 },
        { rowNumber: 0, multiplicator: -1 },
        { rowNumber: 0, multiplicator: -1 }
      ]);
      expect(m2.data()).toEqual([
        ["1", "2", "3+i"],
        ["3", "3", "-i+3"],
        ["6", "6", "-i+6"]
      ]);
    });
  });
  describe("genMatrix", () => {
    it("should gen matrix", () => {
      const data = Structures.genMatrix();
      const m = new Structures.NerdMatrix(data);
      expect(Array.isArray(data)).toBe(true);
      expect(m instanceof Structures.NerdMatrix).toBe(true);
    });
  });
});
