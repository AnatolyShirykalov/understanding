import nerdamer from 'nerdamer';
const eps = 1e-5;

class ComplexExample {
  constructor(f, g) {
    this.f = f;
    this.g = g;
    ['f','g'].forEach(k=>{
      if(typeof(this[k])==='string') this[k] = nerdamer(this[k]);
    })
  }

  combine(combiner='chain') {
    const gvs = this.g.variables();
    const fvs = this.f.variables();
    if(gvs.length !== 1) return null;
    if(fvs.length !== 1) return null;
    const gv = gvs[0];
    const fv = gvs[0];
    const bin = op => nerdamer(`${this.f.text()} ${op} ${this.g.text()}`, {
      [fv]: 'x',
      [gv]: 'x',
    });
    switch(combiner) {
      case 'chain':
        return nerdamer(this.g.text(), {[gv]: this.f.text()});
      case 'add': return bin('+');
      case 'prod': return bin('*');
      default:
        return null;
    }
  }

  compare() {
    let max = 0;
    //let maxPoint = null;
    let bads = 0;
    const f = this.f.buildFunction();
    const g = this.g.buildFunction();
    for (let i = 0; i<200; i++) {
      const x = Math.random() * 1000 - 500;
      try {
        const fx = f(x);
        const gx = g(x);
        if (isNaN(fx) || isNaN(gx) || !isFinite(fx) || !isFinite(gx)) {
          bads += 1;
          if (bads > 200000) return false;
          i-=1;
          continue;
        }
        let denom = Math.min(Math.abs(fx), Math.abs(gx));
        if (denom === 0) denom=1;
        const diff = fx === gx ? 0 : Math.abs((fx - gx)/denom);
        if (diff > max) {
          max = diff;
          //maxPoint = x;
          //console.log(this.f.text(), 'x,diff:', x, diff);
        }
      } catch (e) {
        i-=1;
      }
    }
    //console.log(this.g.text(), 'bads:', bads, 'max:', max, 'maxPoint:', maxPoint)
    return max < eps;
  }
}

export default ComplexExample;
