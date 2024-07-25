import { PolynomialParameters } from '../types';
import type { FieldPolynomial } from '../galois-field-arithmetic';
/**
 * Formats from array of coefficients to polynomial String.
 *
 * @param { polyFormats["coefficients"] } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyFormats['string'] } - The formatted polynomial. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @example
 * const formatted = coefToString([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted); // Output: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @internal
*/
declare function coefToString(coefs: polyFormats["coefficients"]): polyFormats['string'];
/**
 * Formats from polynomial String to array of coefficients.
 *
 * @param { polyFormats['string'] } polyStr - Polynomial to format. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1 "
 * @returns { polyFormats["coefficients"] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = stringToCoef("x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1");
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
 */
declare const stringToCoef: (polyStr: polyFormats["string"]) => polyFormats["coefficients"];
/**
 * Formats from array of exponents to array of coefficients.
 *
 * @param { polyFormats["exponents"] } exponentArr - Polynomial to format. Example: [9,8,7,5,4,1,0]
 * @returns { polyFormats["coefficients"] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = expToCoef([9,8,7,5,4,1,0]);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
*/
declare const expToCoef: (exponentArr: polyFormats["exponents"]) => polyFormats["coefficients"];
/**
 * Formats from array of coefficients to array of exponents.
 * note: only supports whole numbers
 *
 * @param { polyFormats["coefficients"] } coefArr - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyFormats["exponents"] } - The formatted polynomial. Example: [9,8,7,5,4,1,0]
 * @example
 * const formatted = coefToExp([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted) // Output: [9,8,7,5,4,1,0]
 * @internal
*/
declare const coefToExp: (coefArr: polyFormats["coefficients"]) => polyFormats["exponents"];
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
 * @returns {[polyFormats['string'], polyFormats["coefficients"], exponents]} - An object containing the polynomial in all formats: string, coefficients array, and exponents array.
 * @throws {Error} - Throws an error if the input format is invalid.
 * @example
 * const result = polyReformat('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * console.log(result); // Output: {polynomialString: 'x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1', coefficients: [1,1,1,0,1,1,0,0,1,1], exponents: [9,8,7,5,4,1,0]}
 * @public
 */
declare const polyReformat: (poly: PolynomialParameters[keyof PolynomialParameters], formatType?: keyof polyFormats) => [polyFormats["string"], polyFormats["coefficients"], polyFormats["exponents"]];
/**
 * Checks instance of FieldPolynomial. Without causing circular dependency.
 * @internal
 */
declare function isFieldPolynomial(obj: any): obj is FieldPolynomial;
export { coefToString, stringToCoef, expToCoef, coefToExp, removeLZero, polyReformat, isFieldPolynomial };
//# sourceMappingURL=formatter.d.ts.map