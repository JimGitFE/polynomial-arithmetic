// README.md Polynomial examples of both field and normal

// require
const Polynomial = require('../dist/arithmetic.js').Polynomial;
const FieldPolynomial = require('../dist/galois-field-arithmetic.js').FieldPolynomial;

// import - note: type error, not included in ts
// import { Polynomial } from "../arithmetic";
// import { FieldPolynomial } from "../galois-field-arithmetic";

/*

// Addition
const addend = new Polynomial("8x^4+32x-12");
const sum = addend.add("-x^5-16x+6")
console.log(sum.polyString) // - x^5 + 8x^4 + 16x - 6

// Multiplication
const term = sum
const product = term.multiply("4x^2+8")
console.log(product.polyString) // - 4x^7 + 32x^6 - 8x^5 + 64x^4 + 64x^3 - 24x^2 + 128x - 48

// Subtraction
const minuend = product
const difference = minuend.sub("-4x^7 - 8x^5 + 64x^3 + 128x - 48")
console.log(difference.polyString) // 32x^6 + 64x^4 - 24x^2

// Division
const dividend = difference
const {quotient, remainder} = dividend.divide("8x^2")
console.log(quotient.polyString) // 4x^4 + 8x^2 - 3
console.log(remainder.polyString)

// Greatest Common Divisor
const poly1 = difference
const gcd = poly1.gcd(quotient) // - 3
console.log(gcd.polyString)

// Derivative
const poly = new Polynomial("8x^4 + 32x - 12")
console.log(poly.derivative().polyString) // 32x^3 + 32

*/

/*
// Galois Field Arithmetic

const dividend = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
const {quotient, remainder} = dividend.divide('x^4 + x^1 + 1');
console.log("div: ",quotient.polyString) // x^5 + x^4 + x^3 + x^2 + x
console.log("div: ",remainder.polyString) // 1

const term = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
const product = term.multiplyGF('x^3 + x + 1');
console.log("prod: ", product.polyString) // x^7 + x^6 + x^4 + x^3 + 1

const addend = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
const sum = addend.addGF(new FieldPolynomial('x^3 + x + 1'));
console.log("sum: ",sum.polyString) // x^4 + x^2

const minuend = new FieldPolynomial("x^5 + x^3 + x^2 + 1");
const difference = minuend.subGF("x^2 + 1");
console.log("diff: ",difference.polyString) // x^5 + x^3
 */

// Generate High Degree LFSR Feddback shift register Polynomial
// const gateTapsPoly = new FieldPolynomial("x^5 + x^3 + 1");
// const gateTapsPoly = new FieldPolynomial("x^13 + x^12 + x^11 + x^8 + 1");
// const p = new FieldPolynomial("x^16 + x^15 + x^13 + x^4 + 1");

// const p = new FieldPolynomial("x^16 + x^5 + x^3 + x^1 + 1");
// const p = new FieldPolynomial("x^13 + x^12 + x^11 + x^8 + 1")
const p = new FieldPolynomial("x^16 + x^15 x^13 + x^4 + 1")

// const p = new FieldPolynomial("x^4+x^3+1");
// const q = new FieldPolynomial("x^65536 + x");

// const p = new FieldPolynomial("x^4+x^3+1")
// const q = new FieldPolynomial("x^3 + x")

// // console.log("gcd",p.polyGCD(q))
// console.log("gcd",p.polyGCD(q))
// console.log("gcd",q.polyGCD(p))
// console.log("gcd",q.divideGF([ 1, 1, 0, 0, 1 ]))



// // Properties of a Maximum Length Sequence LFSR polynomial taps feed
const irreducible = p.isIrreducible();
const primitive = p.isPrimitive();
const setwise = p.isSetwiseCoprime();

console.log(irreducible, primitive, setwise)
// console.log(primitive)