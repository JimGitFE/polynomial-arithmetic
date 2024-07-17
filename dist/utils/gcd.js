"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyGcd = exports.isAllZero = exports.eea = exports.arrayGcd = exports.lcm = exports.gcd = void 0;
const arithmetic_1 = require("../arithmetic");
/**
 * Compute the greatest common divisor of two numbers.
 * Method: Euclidean algorithm.
 *
 * @param {number}  r0 - dividend
 * @param {number}  r1 - divisor
 * @returns {number} - The greatest common divisor of r0 and r1.
 * @example
 * const result = gcd({r0: 10, r1: 5});
 * console.log(result) // Output: 5
 * @internal
 */
const gcd = ({ r0, r1 }) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1];
    }
    return r0;
};
exports.gcd = gcd;
/**
 * Compute the least common multiple of two numbers.
 * @param a
 * @param b
 * @returns {number} - The least common multiple of a and b.
 * @example
 * const result = lcm(12, 18);
 * console.log(result) // Output: 36
 * @internal
 */
const lcm = (a, b) => {
    return Math.abs(a * b) / (0, exports.gcd)({ r0: a, r1: b });
};
exports.lcm = lcm;
/**
 * Compute the greatest common divisor of an array of numbers.
 *
 * @param { number[] } arr - Array of numbers.
 * @returns { number } - The greatest common divisor of the array.
 * @example
 * const result = arrayGcd([10, 5, 15]);
 * console.log(result) // Output: 5
 * @internal
 */
const arrayGcd = (arr) => {
    if (arr.length == 0) {
        return arr[0];
    }
    else {
        let result = arr[0];
        arr.forEach(num => {
            result = (0, exports.gcd)({ r0: num, r1: result });
            if (result == 1) {
                return result;
            } // stop computing
        });
        return result;
    }
};
exports.arrayGcd = arrayGcd;
/**
 * Compute the multiplicative inverse of two numbers.
 * Method: Extended Euclidean algorithm (linear congruence).
 * Use: Testing for setwise coprime numbers.
 *
 * @param {number}  r0 - dividend
 * @param {number}  r1 - divisor
 * @returns {number} - The multiplicative inverse of r0 mod r1.
 * @example
 * const result = eea({r0: 5, r1: 11});
 * console.log(result) // Output: 9
 * @internal
 */
const eea = ({ r0, r1 }) => {
    let t0 = 0, t1 = 1, q, t;
    while (r0 > 0) {
        q = Math.floor(r1 / r0); // quotient
        t = t0 - q * t1;
        t0 = t1; // swap t1 to t0
        t1 = t; // swap T to t1
        t = r1 % r0;
        r1 = r0; // swap r0 to r1
        r0 = t; // remainder => divisor
    }
    return t0;
};
exports.eea = eea;
// return true on array of zeroes, ex. [0,0] => true, [0,1] => false
/**
 * Check if all numbers in an array are zero.
 *
 * @param { number[] } array - Array of numbers to test.
 * @returns { boolean } - True if all numbers in the array are zero.
 * @example
 * const result = isAllZero([0, 0]);
 * console.log(result) // Output: true
 * @internal
 */
const isAllZero = (array) => {
    return array.every(val => val === 0);
};
exports.isAllZero = isAllZero;
// Euclidean GCD for Polynomials Modulo some number,
// returns & inputs coefficients array type, ex. [3,0,1] not [2,2,2,1] // 3x^2+1
/**
 * Compute the greatest common divisor of two polynomials with optional modulo.
 * Usage: Polynomials in GF(2) perform modulo 2.
 *
 * @param { Polynomial } p - dividend
 * @param { Polynomial } q - divisor
 * @param { number } modulo - Optional modulo value.
 * @returns { Polynomial } - The greatest common divisor of p and q.
 * @example
 * const result = polyGcd({p: [1,1,1], q: [1,1], modulo: 2});
 * console.log(result) // Output: [1,1]
 * @deprecated
 */
const polyGcd = ({ p, q, modulo = 0 }) => {
    // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
    while (!(0, exports.isAllZero)(q)) {
        let remainder;
        // 1.2 Compute Remainder
        if (modulo) {
            remainder = new arithmetic_1.Polynomial(p).divide(q, modulo).remainder.coefficients;
        }
        // if (modulo) {remainder = polyDiv({dividend: p, divisor: q, modulo}).remainder}
        else {
            remainder = new arithmetic_1.Polynomial(p).divide(q).remainder.coefficients;
        }
        // else {remainder = polyDiv({dividend: p, divisor: q}).remainder}
        p = q;
        q = remainder; // remainder can contain left zero
    }
    return p; // p is d / d divides p & q 
};
exports.polyGcd = polyGcd;
//# sourceMappingURL=gcd.js.map