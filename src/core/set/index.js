import math from 'mathjs';

export const schemas = [
  ['A', 'sdd', ['B','cup', 'C']],
  [['A', 'sdd', 'B'], 'cap', ['A', 'sdd', 'C']],
  ['a', 'IN', ['A', 'cup', 'B']]
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
    case 'IN': return fun(' \\in ');
    default: {
      return node.toTex();
    }
  }
};

export const makeEx = schema => {
  if(typeof(schema)==='string') {
    return new math.expression.node.SymbolNode(schema);
  }
  if(!Array.isArray(schema))
    throw new Error(`schema is not string or array. It is ${schema}`);
  const parenthesis = node => new math.expression.node.ParenthesisNode(node);
  if(schema.length === 2) {
    if(typeof(schema[0]) !== 'string')
      throw Error('first element of schema array is not a string');
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
