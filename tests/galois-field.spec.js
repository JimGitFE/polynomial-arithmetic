const FieldPolynomial = require('../dist/galois-field-arithmetic.js').FieldPolynomial;
const { test } = require('@jest/globals'); // types

test("Division", () => {
    const dividend = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
    const {quotient, remainder} = dividend.divideGF('x^4 + x^1 + 1');
    
    expect(quotient.polyCoefficients).toEqual([1,1,1,1,1,1]); // "x^5 + x^4 + x^3 - x^2 - x - 1"
    expect(remainder.polyCoefficients).toEqual([1,0]); // "x"
});

test("Multiplication", () => {
    const term = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
    const product = term.multiplyGF('x^3 + x + 1');
    
    expect(product.polyCoefficients).toEqual([1,1,0,1,1,0,0,1]); // "x^7 + x^6 + x^4 + x^3 + 1"
});

test("Addition & Subtraction", () => {
    // Note: XOR Addition is the same as Subtraction, coefficients are the same: 0 | 1
    const [addend, minuend] = [new FieldPolynomial('x^4 + x^3 + x^2 + x + 1'), new FieldPolynomial("x^5 + x^3 + x^2 + 1")]
    const sum = addend.addGF(new FieldPolynomial('x^3 + x + 1'));
    const difference = minuend.subGF("x^2 + 1");

    expect(sum.polyCoefficients).toEqual([1,0,1,0,0]); // "x^4 + x^2"
    expect(difference.polyCoefficients).toEqual([1,0,1,0,0,0]); // "x^5 + x^3"
})

test("Primitiveness, Irreducibility & Setwise Coprime Taps", () => {
    // Prime divisors of 2^degree none and many x^5
    const gateTapsPolys = [new FieldPolynomial("x^13 + x^12 + x^11 + x^8 + 1"), new FieldPolynomial("x^16 + x^15 x^13 + x^4 + 1")];
    
    // Properties of a Maximum Length Sequence LFSR polynomial taps feed
    const irreducible = gateTapsPolys[0].isIrreducible() && gateTapsPolys[1].isIrreducible();
    const primitive = gateTapsPolys[0].isPrimitive() && gateTapsPolys[1].isPrimitive();
    const setwise = gateTapsPolys[0].isSetwiseCoprime() && gateTapsPolys[1].isSetwiseCoprime();
    
    expect(irreducible).toEqual(true);
    expect(primitive).toEqual(true);
    expect(setwise).toEqual(true);
});