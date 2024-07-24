import { PolynomialFormats, PolynomialParameters } from "./glboal";
/**
 * Polynomial class with arithmetic methods.
 * @example
 * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * const result = polynomial.divide([1,1,1,0,1,1,0,0,1,1]);
 * console.log(result.remainder.polynomialString) // Output: x^4 + x^1 + 1
 * const result2 = result.divide([1,1,1,0,1,1,0,0,1,1]);
 * console.log(result2.quotient.polynomialString) // Output: x^5 + x^4 + x^3 + x^2 + x^1 + 1
 * @public
*/
export declare class Polynomial {
    polyFormats: PolynomialFormats;
    coefficients: (0 | 1 | -1)[];
    exponents: number[];
    polynomialString: string;
    constructor(originalPolynomial: PolynomialParameters, { onlyExps }?: {
        onlyExps?: boolean;
    });
    /**
     * Polynomial division method
     *
     * @param { PolynomialParameters } divisorParam - Divisor polynomial
     * @param { number } modulo - Modulo value for division, defaults to no modulo
     * @returns {{ remainder: Polynomial, quotient: Polynomial }} - Remainder and quotient of the division
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.divide([1,1,1,0,1,1,0,0,1,1]);
     * console.log(result.remainder.polynomialString) // Output: x^4 + x^1 + 1
     * @public
     */
    divide(divisorParam: PolynomialParameters, modulo?: number): {
        remainder: Polynomial;
        quotient: Polynomial;
    };
    /**
     * Polynomial multiplication method
     *
     * @param { PolynomialParameters } b - multiplier factor
     * @returns { Polynomial } - Product of the multiplication
     * @example
     * const polynomial = new Polynomial('2x^5 + 4x^4 + 1');
     * const result = polynomial.multiply([1,1,0,0,1,1]);
     * console.log(result.polynomialString) // Output: 2x^9 + 6x^8 + 4x^7 + 2x^5 + 4x^4 + 1
     */
    multiply(a: number[], b: number[]): Polynomial;
    /**
     * Polynomial addition method
     *
     * @param { PolynomialParameters } b - addend polynomial
     * @returns { Polynomial } - Sum of the polynomials
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.add([1,1,1,0,1,1,0,0,1,1]);
     * console.log(result.polynomialString) // Output: x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
     * @public
    */
    add(a: number[], b: number[]): Polynomial;
    /**
     * Polynomial subtraction method
     *
     * @param { PolynomialParameters } b - Subtrahend polynomial
     * @returns { Polynomial } - Difference of the polynomials
     * @example
     * const polynomial = new Polynomial('x^4 + x^1 + 1');
     * const result = polynomial.sub([1,1]);
     * console.log(result.polynomialString) // Output: x^4
     * @public
    */
    sub(a: number[], b: number[]): Polynomial;
    /**
     * Polynomial derivative method
     * @returns { Polynomial } - Derivative of the polynomial
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.derivative();
     * console.log(result.polynomialString) // Output: 9x^8 + 8x^7 + 7x^6 + 5x^4 + 4x^3 + x^1
     * @public
     */
    derivative(): Polynomial;
    /**
     * Check if coefficients are all zero
     * Use: equivalent of null polynomial
     *
     * @returns { boolean } - True if all coefficients are zero
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * console.log(polynomial.isAllZero()) // Output: false
     */
    isAllZero(): boolean;
}
//# sourceMappingURL=arithmetic.d.ts.map