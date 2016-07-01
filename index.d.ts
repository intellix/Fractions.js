export class Fraction {

  numerator: any;
  denominator: any;

  constructor(numerator: any, denominator: any);

  multiply(frac: any): any;
  divide(frac: any): any;
  add(frac: any): any;
  subtract(frac: any): any;
  simplify(): any;
  toString(): any;
  equals(): any;
  valueOf(): any;

  static add(frac1: any, frac2: any): any;
  static subtract(frac1: any, frac2: any): any;
  static multiply(frac1: any, frac2: any): any;
  static divide(frac1: any, frac2: any): any;
  static simplify(frac: any): any;
  static greatestCommonDivisor(num1: any, num2: any): any;
  static toString(frac: any): any;
  static equals(frac1: any, frac2: any): any;
  static valueOf(frac: any): any;
  static correctArgumentLength(ideal: any, actual: any): any;
  static change(oldFrac: any, newFrac: any): any;
  static isString(s: any): any;
  static fromFraction(frac: any): any;
  static decimalToFraction(x: any): any;
}
