const Polynomial = require('../dist/arithmetic.js').Polynomial;
const { test } = require('@jest/globals'); // types

test('Addition', () => {
    // Polynomial addition with different degrees & negative coefficients
    const addend = new Polynomial("8x^4 + 32x - 12");
    const sum = addend.add("- x^5 - 16x + 6")

    expect(sum.polyCoefficients).toEqual([-1, 8, 0, 0, 16, -6] ); // "- x^5 + 8x^4 + 16x - 6"
});

test('Multiplication', () => {
    // Polynomial multiplication with different degrees, negative > 1 coefficients
    const term = new Polynomial("- x^5 + 8x^4 + 16x - 6");
    const product = term.multiply("4x^2 + 8")

    expect(product.polyCoefficients).toEqual([-4, 32, -8, 64, 64, -24, 128, -48]); // "- 4x^7 + 32x^6 - 8x^5 + 64x^4 + 64x^3 - 24x^2 + 128x - 48"
});

test('Subtraction', () => {
    // Polynomial subtraction with different degrees, negative > 1 coefficients
    const minuend = new Polynomial("- 4x^7 + 32x^6 - 8x^5 + 64x^4 + 64x^3 - 24x^2 + 128x - 48");
    const difference = minuend.sub("-4x^7 - 8x^5 + 64x^3 + 128x - 48")

    expect(difference.polyCoefficients).toEqual([32, 0, 64, 0, -24, 0, 0]); // "32x^6 + 64x^4 - 24x^2"
});

test('Division', () => {
    // Polynomial division, with divisible dividend, empty remainder = 0
    const dividend = new Polynomial("32x^6 + 64x^4 - 24x^2");
    const {quotient, remainder} = dividend.divide("8x^2")

    expect(quotient.polyCoefficients).toEqual([4, 0, 8, 0, -3]); // "4x^4 + 8x^2 - 3"
    expect(remainder.polyCoefficients).toEqual([]); // "0"
});

test('Greatest Common Divisor', () => {
    // Polynomial GCD with a number result
    const poly1 = new Polynomial("32x^6 + 64x^4 - 24x^2");
    const gcd = poly1.gcd("4x^4 + 8x^2 - 3")

    expect(gcd.polyCoefficients).toEqual([-3]); // "- 3"
});

test('Derivative', () => {
    // Polynomial derivative with coefficients 1
    const poly = new Polynomial("8x^4 + 32x - 12");
    const derivative = poly.derivative()
    
    expect(derivative.polyCoefficients).toEqual([32, 0, 0, 32]); // "32x^3 + 32"
});