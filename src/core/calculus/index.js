import nerdamer from 'nerdamer';
const eps = 1e-7;

class ComplexExample {
  constructor(f, g) {
    this.f = nerdamer(f);
    this.g = nerdamer(g);
  }

  combine() {
    const vs = this.g.variables();
    if(vs.length !== 1) return null;
    const v = vs[0];
    return nerdamer(this.g.text(), {[v]: this.f.text()});
  }

  compare() {
    let max = 0;
    const f = this.f.buildFunction();
    const g = this.g.buildFunction();
    for (let i = 0; i<200; i++) {
      const x = Math.random() * 100 - 50;
      try {
        if (isNaN(f(x)) || isNaN(g(x))) continue;
        const diff = Math.abs(f(x) - g(x));
        max = diff > max ? diff : max;
      } catch (e) {
        i-=1;
      }
    }
    return max < eps;
  }
}

export default ComplexExample;
