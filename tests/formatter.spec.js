const Polynomial = require('../dist/arithmetic.js').Polynomial;
const exp = require('constants');
const { coefToString, stringToCoef, expToCoef, coefToExp } = require('../dist/utils/formatter.js');
const { test } = require('@jest/globals'); // types

test('Coefficient to String', () => {
    // Coefficient to string, negative & empty terms, comparing trimmed strings
    const polys = [[-4, 8, 0, 2], [], [0], [1], [1,0]]
    const strings = polys.map(poly=>coefToString(poly))
    
    expect(strings[0].replace(/\s/g, '')).toEqual("-4x^3+8x^2+2")
    expect(strings[1]).toEqual("0")
    expect(strings[2]).toEqual("0")
    expect(strings[3]).toEqual("1")
    expect(strings[4]).toEqual("x")
})

test('String to coefficients', () => {
    // String with negative & empty terms
    const polys = ["-4x^2 + 2", "", "0", "1","x"]
    const coefs = polys.map(poly=>stringToCoef(poly))

    expect(coefs[0]).toEqual([-4, 0, 2])
    expect(coefs[1]).toEqual([0]) // " 0 "
    expect(coefs[2]).toEqual([0]) // " 0 "
    expect(coefs[3]).toEqual([1]) // " 1 "
    expect(coefs[4]).toEqual([1,0]) // " x "
});

test('Exponents to Coefficients', () => {
    // Exponents to coefficients, note: negative representations are not used in modular arithmetic -1 mod 5 = 4
    const polys = [[4,0], [], [1], [5, 1, 1], [0], [0,0]]
    const exps = polys.map(poly=>expToCoef(poly))

    expect(exps[0]).toEqual([1, 0, 0, 0, 1])
    expect(exps[1]).toEqual([0])
    expect(exps[2]).toEqual([1, 0])
    expect(exps[3]).toEqual([1, 0, 0, 0, 2, 0])
    expect(exps[4]).toEqual([1])
    expect(exps[5]).toEqual([2])
})

test('Coefficients to Exponents', () => {
    // Coefficients to exponents, in GF(2) coefficients are always 0 or 1
    // note: only supports whole numbers
    const polys = [[1, 0, 0, 0, 1], [0], [], [1, 0], [1, 0, 0, 0, -2, 0], [1], [2]]
    const coefs = polys.map(poly=>coefToExp(poly))

    expect(coefs[0]).toEqual([4, 0])
    expect(coefs[1]).toEqual([])
    expect(coefs[2]).toEqual([])
    expect(coefs[3]).toEqual([1])
    expect(coefs[4]).toEqual([5, -1, -1])
    expect(coefs[5]).toEqual([0])
    expect(coefs[6]).toEqual([0,0])
})

test("Polynomial constructor with exponents representation" , () => {
    const exponents = [8,4,0,0] // x^8 + x^4 + 2
    const polynomial = new Polynomial(exponents, {polyType: "exponents"})

    expect(polynomial.polyString).toEqual("x^8 + x^4 + 2")
    expect(polynomial.polyCoefficients).toEqual([1,0,0,0,1,0,0,0,2])
    expect(polynomial.polyExponents).toEqual([8,4,0,0])
})