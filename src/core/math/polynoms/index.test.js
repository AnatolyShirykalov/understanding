import { Polynom } from ".";
describe("polynoms", () => {
  it("should calculate coeffs", () => {
    const p = new Polynom({ roots: [-1, -1] });
    expect(p.coeffs()).toEqual(["1", "2", "1"]);
  });
});
