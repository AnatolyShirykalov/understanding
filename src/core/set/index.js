import math from 'mathjs';
import hash from 'object-hash';
import {pairs} from '../bool/mjs';

export const schemas = [
  ['A', 'sdd', ['B','cup', 'C']],
  [['A', 'sdd', 'B'], 'cap', ['A', 'sdd', 'C']],
];

export const ubd = [
  [ [['A', 'cup', 'B'], 'cap', 'C'], [['A', 'cap', 'C'], 'cup', ['B', 'cap', 'C']] ],
  [ [['A', 'cap', 'B'], 'cup', 'C'], [['A', 'cup', 'C'], 'cap', ['B', 'cup', 'C']] ],
  [ ['A', 'cap', 'B'], ['A', 'sdd', ['A', 'sdd', 'B']] ],
  [ ['A', 'sdd', ['B', 'sdd', 'C']], [['A', 'sdd', 'B'], 'cup', ['A', 'cap', 'C']] ],
  [ [['A', 'sdd', 'B'], 'sdd', 'C'], ['A', 'sdd', ['B', 'cup', 'C']] ],
  [ [['A', 'sdd', 'B'], 'sdd', 'C'], [['A', 'sdd', 'C'], 'sdd', ['B', 'sdd', 'C']] ],
  [ ['A', 'sdd', ['B','cup', 'C']],  [['A', 'sdd', 'B'], 'cap', ['A', 'sdd', 'C']] ],
  [ ['A', 'sdd', ['B','cap', 'C']],  [['A', 'sdd', 'B'], 'cup', ['A', 'sdd', 'C']] ],
  [ [['A', 'cup', 'B'], 'sdd', 'C'], [['A', 'sdd', 'C'], 'cup', ['B', 'sdd', 'C']] ],
  [ [['A', 'cap', 'B'], 'sdd', 'C'], [['A', 'sdd', 'C'], 'cap', ['B', 'sdd', 'C']] ],
];

export const setToLaTeX = (node, options) => {
  const fun = op => [0, 1].map(i=>node.args[i].toTex(options)).join(op);
  if(node.type === 'ParenthesisNode')
    return `\\left(${node.content.toTex(options)}\\right)`;
  if(node.type === 'SymbolNode')
    return node.name;
  if(node.type !== 'OperatorNode') return node.toTex();
  switch(node.fn) {
    case 'cup': return fun(' \\cup ');
    case 'cap': return fun(' \\cap ');
    case 'sdd': return fun(' \\setminus ' );
    case 'and': return fun(' \\wedge ' );
    case 'or': return fun(' \\vee ' );
    case 'IN': return fun(' \\in ');
    case 'not': return `\\neg ${node.args[0].toTex(options)}`
    default: {
      return node.toTex();
    }
  }
};

const toBoolDict = {
  cap: 'and',
  cup: 'or',
  sdd: 'and',
}

export const toArrays = (node, toBool) => {
  switch(node.type) {
    case 'SymbolNode': return node.name;
    case 'ConstantNode': return node.value;
    case 'ParenthesisNode': return toArrays(node.content, toBool);
    case 'OperatorNode':
      switch(node.fn) {
        case 'not': return ['not', toArrays(node.args[0], toBool)];
        default:
          const exs = node.args.map(n=>toArrays(n, toBool));
          if (toBool===true && toBoolDict.hasOwnProperty(node.fn)) {
            let r = exs[1];
            if (node.fn === 'sdd') r = ['not', r];
            return [exs[0], toBoolDict[node.fn], r];
          }
          return [exs[0], node.fn, exs[1]];
      }
    default: throw new Error(`unknown case ${node.type}`);
  }
}


export const bools = pairs.map(pair=>{
  return pair.map(ex=>math.parse(ex)).map(toArrays);
});

export const expandedBools = bools.reduce((bs, pair)=>{
  return [...bs, pair, [pair[1], pair[0]]];
}, []);

export const boolMethods = ex => {
  return expandedBools.filter(pair=>match(ex, pair[0]));
}

export const makeEx = schema => {
  if(typeof(schema)==='string') {
    return new math.expression.node.SymbolNode(schema);
  }
  if(!Array.isArray(schema))
    throw new Error(`schema is not string or array. It is ${schema}`);
  const parenthesis = node => new math.expression.node.ParenthesisNode(node);
  if(schema.length === 2) {
    if(typeof(schema[0]) !== 'string'){
      console.log(schema);
      throw Error(`first element of schema array is not a string ${schema[0]}`);
    }
    return parenthesis(new math.expression.node.OperatorNode(
      schema[0], schema[0], [makeEx(schema[1])]
    ));
  }
  if(schema.length === 3) {
    return parenthesis(
      new math.expression.node.OperatorNode(
        schema[1], schema[1], [0,2].map(i=>makeEx(schema[i]))
      )
    );
  }
}

export const toTeX = ex => makeEx(ex).toTex({handler: setToLaTeX});

export const moves = src => {
  if(typeof(src)==='string') return {};
  if(!Array.isArray(src))
    throw new Error(`unknown typeof(src) of src ${src}`);
  switch(src.length) {
    case 2: return {down: 1};
    case 3: return {left: 1, right: 1};
    default: throw new Error(`unknown array length of ${src}`);
  }
};

const moveToIndex = {
  'down': 1,
  'left': 0,
  'right': 2,
};

export const subExp = (ex, mvs = []) => {
  let ret = ex;
  mvs.forEach(move=>{
    switch(move){
      case 'down': ret = ret[1]; break;
      case 'left': ret = ret[0]; break;
      case 'right': ret = ret[2]; break;
      default: throw new Error(`wrong move ${move}`);
    }
  });
  return ret;
};

export const transformSub = (ex, sub, mvs=[]) => {
  if(mvs.length === 0) return sub;
  const mi = moveToIndex[mvs[0]];
  return ex.map((a,i)=>i===mi ? transformSub(a, sub, mvs.slice(1)) : a);
}

class NoDefError extends Error {
  constructor(src) {
    super(`no definition for ${src}`);
  }
}

export const definition = src => {
  if(src.length !== 3 || src[1] !== 'IN') throw new NoDefError(src);
  return inDefinition(src)
};

const inDefinition = src => {
  switch(src[2].length) {
    case 3:
      switch(src[2][1]) {
        case 'cap': return [[src[0], 'IN', src[2][0]], 'and' ,[src[0], 'IN', src[2][2]]];
        case 'cup': return [[src[0], 'IN', src[2][0]], 'or' ,[src[0], 'IN', src[2][2]]];
        case 'sdd': return [[src[0], 'IN', src[2][0]], 'and' , ['not',[src[0], 'IN', src[2][2]]]];
        default: throw new NoDefError(src);
      }
    default: throw new NoDefError(src);
  }
};

export const match = (src, ptrn) => {
  if (typeof(ptrn) === 'string') return {[ptrn]: src};
  const [sl, pl] = [src.length, ptrn.length];
  if (sl !== pl) return false;
  switch(sl){
    case 2:
      return src[0]===ptrn[0] ? match(src[1], ptrn[1]) : false;
    case 3:
      if (src[1] !== ptrn[1]) return false;
      const ms = [0, 2].map(i=>match(src[i], ptrn[i]));
      if(!ms[0] || !ms[1]) return false;
      const keys = ms.map(Object.keys);
      const sk1 = new Set(keys[0]);
      const intrs = keys[1].filter(k=>sk1.has(k));
      for (let i in intrs) {
        const hs = ms.map(m=>hash({k: m[intrs[i]]}));
        //console.log(ms.map(m=>m[intrs[i]]));
        if (hs[0] !== hs[1]) return false;
      }
      return {...ms[0], ...ms[1]};
    default: return false;
  }
};

export const at = (src, m) => {
  if(typeof(src) === 'string') {
    if(m.hasOwnProperty(src)) return m[src];
    return src;
  }
  return src.map(s=>at(s,m));
}

export const subst = (src, from, to) => {
  //console.log(src, from ,to);
  const m = match(src, from);
  if(!m) throw new Error('subst on not match');
  return at(to, m);
};
