export const maxOnesInInt = () => {
  let s = '';
  for(let i = 0; i < 200; i++){
    s+='1';
    if (parseInt(s, 2).toString(2)!==s) break;
  }
  return s.length - 1;
};

export const operators = {
  NEG: '\\neg',
  OR: '\\vee',
  AND: '\\wedge',
}

export class Formula {
  constructor(data) {
    this.l = data.l;
    this.r = data.r;
    this.op = data.op;
    this.updateVars();
  }

  updateVars() {
    this.vars = [];
    ['l','r'].forEach(k=>{
      if (typeof(this[k]) === 'string')
        this.vars = [...new Set(this.vars).add(this[k])].sort();
      else if (this[k] !== undefined)
        this.vars = [...new Set([...this.vars, ...this[k].vars])].sort();
    });
  }

  child = ex => {
    if(typeof(ex) === 'string') return ex;
    return ex.toTeX();
  }

  surround = ex => {
    if(typeof(ex)==='string') return ex;
    return `\\left(${this.child(ex)}\\right)`;
  }

  maybesurround = ex => {
    if(ex.op !== operators.OR) return this.child(ex);
    return this.surround(ex);
  }

  at(args) {
    if(!Array.isArray(args)) {
      let r = this.r;
      let l = this.l;
      if(typeof(r) === 'string') r = args[this.r];
      else r = r && r.at(args);
      if(typeof(l) === 'string') l = args[this.r];
      else l = l && l.at(args);
      return new Formula({...(this.op===operators.NEG ? {} :{l}), op: this.op, r});
    }
    if(args.length < this.vars.length) throw new Error('arguments are not enough');
    let r = {};
    this.vars.forEach((v,i)=>r[v]=args[i]+'');
    return this.at(r);
  }

  toTeX() {
    switch(this.op){
      case operators.NEG:
        return `${this.op} ${this.surround(this.r)}`;
      case operators.OR:
        return `${this.child(this.l)} ${this.op} ${this.child(this.r)}`;
      case operators.AND:
        return `${this.maybesurround(this.l)} ${this.op} ${this.maybesurround(this.r)}`;
      default: return '';
    }
  }

  fChild = ex => {
    if(typeof(ex) !== 'string') return ex.toFun();
    const index = this.vars.indexOf(ex);
    return (...args) => parseInt(args[index], 10)===1;
  }

  toFun(){
    switch(this.op) {
      case operators.NEG: return (...args)=>!this.fChild(this.r)(...args);
      case operators.OR: return(...args)=>['l','r'].reduce((r, k)=>r || this.fChild(this[k])(...args), false);
      case operators.AND: return(...args)=>['l','r'].reduce((r, k)=>r && this.fChild(this[k])(...args), true);
      default: return ()=>false;
    }
  }

  toVector() {
    const ret = [];
    const vc = this.vars.length;
    const fun = this.toFun();
    Array(2**vc).fill(0).forEach((a, key)=>{
      const args = Array(vc).fill(0).map((v, i)=>
        key < 2**(vc-i-1) ? 0 : key.toString(2)[key.toString(2).length - vc + i]
      );
      ret.push(fun(...args));
    });
    return ret.map(k=>k==='1' || k === 1 || k===true?1:0);
  }

  eChild = ex => {
    if(typeof(ex) === 'string') {
      switch(ex) {
        case '0':
          return 'false';
        case '1':
          return 'true';
        default:
          throw new Error(`Cannot eval Formula with variable ${ex}; Only 1 and 0 are supported`);
      }
    }
    return ex.eval();
  }

  eval() {
    switch(this.op){
      case operators.NEG:
        return `!(${this.eChild(this.r)})`;
      case operators.OR:
        return `(${this.eChild(this.l)} || ${this.eChild(this.r)})`;
      case operators.AND:
        return `(${this.eChild(this.l)}) && (${this.eChild(this.r)})`;
      default: return '';
    }
  }
};

const rand = (n=1) => Math.floor(Math.random()*n);

export const makeFormula = (vars, depth = 1) => {
  const opKeys = Object.keys(operators);
  const op = operators[opKeys[rand(opKeys.length)]];
  if(depth === 1) {
    const r = vars[rand(vars.length)];
    if(op === operators.NEG) return new Formula({r, op});
    const l = vars.filter(v=>v!==r)[rand(vars.length - 1)];
    return new Formula({r,l,op});
  }
  const r = makeFormula(vars, depth - 1);
  const l = op === operators.NEG ? undefined : makeFormula(vars, depth - 1);
  return new Formula({r, l, op});
}

export const makeEquality = (vars, depth = 1) => {
  const l = makeFormula(vars, depth);
  let i = 0;
  while(i<200000) {
    const r = makeFormula(vars, depth);
    if(
      l.toVector().join()===r.toVector().join() &&
      r.toTeX() !== l.toTeX()
    ) return [l, r];
  }
  throw new Error('cannot create equality');
};
