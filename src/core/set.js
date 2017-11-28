import * as ops from './operators';
import {sets, elements} from './variables';

export class Variable {
  constructor(name){
    this.name = name;
  }

  text(){
    return this.name;
  }

  variables(){
    return [this.name];
  }

  transform(){
    return this;
  }

  leftBrace() {
    return '';
  }

  rightBrace() {
    return '';
  }
}

export class Expression {
  constructor(left, op, right){
    this.left = left;
    this.op = op;
    this.right = right;
  }

  isDangerous() {
    return new Set([ops.CAP]).has(this.op);
  }

  needBraces(){
    return new Set([ops.CUP]).has(this.op);
  }

  variables() {
    return new Set([...this.left.variables(), ...this.right.variables()]);
  }

  availableVariables() {
    const alreadyUsed = this.variables();
    return sets.filter(v=>!alreadyUsed.has(v));
  }

  availableElements() {
    const alreadyUsed = this.variables();
    return elements.filter(v=> !alreadyUsed.has(v));
  }

  inDefinition(left){
    let op;
    switch(this.op) {
      case ops.CAP: op = ops.AND; break;
      case ops.CUP: op = ops.OR; break;
      default: return this;
    }
    return new Expression(
      new Expression(left, ops.IN, this.left),
      op,
      new Expression(left, ops.IN, this.right)
    );
  }

  definition(){
    const v = this.availableElements()[0];

    switch(this.op) {
      case ops.SUBSET:
        return new Expression(
          new Expression(new Variable(v), ops.IN, this.left),
          ops.IMP,
          new Expression(new Variable(v), ops.IN, this.right)
        );
      case ops.SUPSET:return new Expression(this.right, ops.SUBSET, this.left);
      case ops.IN:
        if(!this.right.op) return this;
        return this.right.inDefinition(this.left);
      case ops.AND: return this;
      case ops.EQ: return new Expression(
          new Expression(this.left, ops.SUBSET, this.right),
          ops.AND,
          new Expression(this.right, ops.SUBSET, this.left)
        );
      default:
        return new Expression(new Variable(v), ops.IN, this);
    }
  }

  transform(what=[]) {
    if (what.length === 0) return this.definition();
    const w = what.slice(1);
    switch(what[0]) {
      case 'left':
        return new Expression(this.left.transform(w), this.op, this.right);
      case 'right':
        return new Expression(this.left, this.op, this.right.transform(w));
      case 'op': return this.definition();
      default: return this;
    }
  }

  leftBrace(){
    return this.needBraces() ? '(' : '';
  }

  rightBrace(){
    return this.needBraces() ? ')' : '';
  }

  text() {
    if (this.isDangerous()) {
      return [
        this.left.leftBrace(),
        this.left.text(),
        this.left.rightBrace(),
        this.op,
        this.right.leftBrace(),
        this.right.text(),
        this.right.rightBrace()
      ].join(' ');
    }
    return [
      this.left.text(),
      this.op,
      this.right.text()
    ].join(' ');
  }

  current(l, r) {
    return new Expression( new Variable(l), this.op, new Variable(r)).text();
  }

  cannotChangeSubexpressionFirst() {
    return this.op === ops.EQ;
  }

  leftPart(l, r) {
    if (!this.left.op) return l;
    return this.left.current(l, r);
  }
  rightPart(l, r) {
    if (!this.right.op) return r;
    return this.right.current(l, r);
  }
}
