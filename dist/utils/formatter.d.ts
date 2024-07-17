import { PolynomialParameters, PolynomialFormats } from '../glboal';
/**
 * Formats from array of coefficients to polynomial String.
 *
 * @param { number[] } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns {string} - The formatted polynomial. Example: x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
 * @example
 * const formatted = coefToString([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted); // Output: x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
 * @internal
*/
export declare function coefToString(coefs: number[]): string;
/**
 * Formats from polynomial String to array of coefficients.
 *
 * @param { number[] } coefs - Polynomial to format. Example: x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
 * @returns { number[] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = stringToCoef(x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
 */
export declare const stringToCoef: (coefs: string) => number[];
/**
 * Formats from array of exponents to array of coefficients.
 *
 * @param { number[] } exponentArr - Polynomial to format. Example: [9,8,7,5,4,1,0]
 * @returns { (0 | 1|-1)[] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = expToCoef([9,8,7,5,4,1,0]);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
*/
export declare const expToCoef: (exponentArr: number[]) => (0 | 1 | -1)[];
/**
 * Formats from array of coefficients to array of exponents.
 *
 * @param { number[] } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { number[] } - The formatted polynomial. Example: [9,8,7,5,4,1,0]
 * @example
 * const formatted = coefToExp([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted) // Output: [9,8,7,5,4,1,0]
 * @internal
*/
export declare const coefToExp: (coefArr: (0 | 1 | -1)[]) => number[];
/**
 * Removes leading zeroes from array.
 *
 * @param { number[] } poly0 - Input Array. Example: [0,1]
 * @returns {  } - Result Array, Example: [1]
 * @example
 * const formatted = removeLZero([0,1]);
 * console.log(formatted) // Output: [1]
 * @internal
*/
export declare const removeLZero: (poly0: number[]) => number[] | (0 | 1 | -1)[];
/**
 * Translates a polynomial of any format into all representations.
 *
 * @param {PolynomialParameters} poly - The input polynomial. It can be an instance of the Polynomial class, a string representation, an exponent array representation, or a coefficient array representation.
 * @returns {PolynomialFormats} - An object containing the polynomial in all formats: string, coefficients array, and exponents array.
 * @throws {Error} - Throws an error if the input format is invalid.
 * @example
 * const result = polyReformat('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * console.log(result); // Output: {polynomialString: 'x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1', coefficients: [1,1,1,0,1,1,0,0,1,1], exponents: [9,8,7,5,4,1,0]}
 * @public
 */
export declare const polyReformat: (poly: PolynomialParameters) => PolynomialFormats;
//# sourceMappingURL=formatter.d.ts.map