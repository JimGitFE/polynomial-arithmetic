import { PolynomialParameters } from '../types';
import { polyFormats } from '../types/enums';
import type { FieldPolynomial } from '../galois-field-arithmetic';
/**
 * Formats from array of coefficients to polynomial String.
 *
 * @param { polyCoefficients } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyString } - The formatted polynomial. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @example
 * const formatted = coefToString([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted); // Output: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @internal
*/
declare function coefToString(coefs: polyCoefficients): polyString;
/**
 * Formats from polynomial String to array of coefficients.
 *
 * @param { polyString } polyStr - Polynomial to format. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1 "
 * @returns { polyCoefficients } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = stringToCoef("x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1");
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
 */
declare const stringToCoef: (polyStr: polyString) => polyCoefficients;
/**
 * Formats from array of exponents to array of coefficients.
 *
 * @param { polyExponents } exponentArr - Polynomial to format. Example: [9,8,7,5,4,1,0]
 * @returns { polyCoefficients } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = expToCoef([9,8,7,5,4,1,0]);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
*/
declare const expToCoef: (exponentArr: polyExponents) => polyCoefficients;
/**
 * Formats from array of coefficients to array of exponents.
 * note: only supports whole numbers
 *
 * @param { polyCoefficients } coefArr - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyExponents } - The formatted polynomial. Example: [9,8,7,5,4,1,0]
 * @example
 * const formatted = coefToExp([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted) // Output: [9,8,7,5,4,1,0]
 * @internal
*/
declare const coefToExp: (coefArr: polyCoefficients) => polyExponents;
/**
 * Removes leading zeroes from array.
 *
 * @param { number[] } poly0 - Input Array. Example: [0,1]
 * @returns { number[] | (0|1|-1)[] } - Result Array, Example: [1]
 * @example
 * const formatted = removeLZero([0,1]);
 * console.log(formatted) // Output: [1]
 * @internal
*/
declare const removeLZero: (poly0: number[]) => number[] | (0 | 1 | -1)[];
/**
 * Translates a polynomial of any format into all representations.
 *
 * @param {PolynomialParameters} poly - The input polynomial. It can be an instance of the Polynomial class, a string representation, an exponent array representation, or a coefficient array representation.
 * @returns {[polyString, polyCoefficients, exponents]} - An object containing the polynomial in all formats: string, coefficients array, and exponents array.
 * @throws {Error} - Throws an error if the input format is invalid.
 * @example
 * const result = polyReformat('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * console.log(result); // Output: {polynomialString: 'x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1', coefficients: [1,1,1,0,1,1,0,0,1,1], exponents: [9,8,7,5,4,1,0]}
 * @public
 */
declare const polyReformat: (poly: PolynomialParameters[keyof PolynomialParameters], formatType?: polyFormats) => [polyString, polyCoefficients, polyExponents];
/**
 * Checks instance of FieldPolynomial. Without causing circular dependency.
 * @internal
 */
declare function isFieldPolynomial(obj: any): obj is FieldPolynomial;
export { coefToString, stringToCoef, expToCoef, coefToExp, removeLZero, polyReformat, isFieldPolynomial };
//# sourceMappingURL=formatter.d.ts.map