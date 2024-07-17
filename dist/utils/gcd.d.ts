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
export declare const gcd: ({ r0, r1 }: {
    r0: number;
    r1: number;
}) => number;
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
export declare const lcm: (a: number, b: number) => number;
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
export declare const arrayGcd: (arr: number[]) => number;
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
export declare const eea: ({ r0, r1 }: {
    r0: number;
    r1: number;
}) => number;
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
export declare const isAllZero: (array: number[]) => boolean;
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
export declare const polyGcd: ({ p, q, modulo }: {
    p: (0 | 1 | -1)[];
    q: (0 | 1 | -1)[];
    modulo?: number;
}) => (0 | 1 | -1)[];
//# sourceMappingURL=gcd.d.ts.map