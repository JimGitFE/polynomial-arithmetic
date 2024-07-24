/**
 * Check if two arrays have equal order and elements.
 *
 * @param { any[] } a - First array to compare.
 * @param { any[] } b - Second array to compare.
 * @returns { boolean } - True if arrays are equal, false otherwise.
 * @example
 * const result = compareArrays([1, 2, 3], [1, 2, 3]);
 * console.log(result) // Output: true
 * @internal
 */
export declare const compareArrays: (a: any[], b: any[]) => boolean;
/**
 * Check if a number is prime.
 *
 * @param { number } num - Number to check.
 * @returns { boolean } - True if the number is prime, false otherwise.
 * @example
 * const result = isPrime(7);
 * console.log(result) // Output: true
 * @internal
 */
export declare function isPrime(num: number): boolean;
/**
 * Compute modulo of a number.
 *
 * @param { number } num - Number to compute modulo.
 * @param { number } modulo - Modulus number.
 * @returns { number } - The modulo of the number.
 * @example
 * const result = mod(7, 3);
 * console.log(result) // Output: 1
 * @internal
 */
export declare const mod: (num: number, modulo: number) => number;
/**
 * Compute the power of a number modulo another number.
 * Method: Binary bitwise exponentiation, enables high exponent calculation.
 * Avoids: Exceeding int limit from large intermediate results.
 *
 * @param { number } base - Base number.
 * @param { number } exponent - Exponent number.
 * @param { number } modulus - Modulus number.
 * @returns { number } - The power of the number modulo the modulus.
 * @example
 * const result = powerMod(2, 3, 3);
 * console.log(result) // Output: 2
 * @internal
*/
export declare function powerMod(base: number, exponent: number, modulus: number): number;
//# sourceMappingURL=math.d.ts.map