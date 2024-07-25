import type { PolynomialParameters, PolynomialConstructorParameters } from './types';
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
    polyCoefficients: polyFormats["coefficients"];
    polyExponents: polyFormats["exponents"];
    polyString: polyFormats['string'];
    constructor(originalPolynomial: PolynomialParameters[keyof PolynomialParameters], { skipFormat, polyType }?: PolynomialConstructorParameters);
    /**
     * Polynomial division method
     *
     * @param { PolynomialParameters[keyof PolynomialParameters] } divisorParam - Divisor polynomial
     * @param { number } modulo - Modulo value for division, defaults to no modulo
     * @returns {{ remainder: Polynomial, quotient: Polynomial }} - Remainder and quotient of the division
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.divide([1,1,1,0,1,1,0,0,1,1]);
     * console.log(result.remainder.polynomialString) // Output: x^4 + x^1 + 1
     * @public
     */
    divide(divisorParam: PolynomialParameters[keyof PolynomialParameters], modulo?: number): {
        quotient: Polynomial;
        remainder: Polynomial;
    };
    /**
     * Polynomial multiplication method
     *
     * @param { PolynomialParameters[keyof PolynomialParameters] } factorPoly - multiplier factor
     * @returns { Polynomial } - Product of the multiplication
     * @example
     * const polynomial = new Polynomial('2x^5 + 4x^4 + 1');
     * const result = polynomial.multiply([1,1,0,0,1,1]);
     * console.log(result.polynomialString) // Output: 2x^9 + 6x^8 + 4x^7 + 2x^5 + 4x^4 + 1
     */
    multiply(factorPoly: PolynomialParameters[keyof PolynomialParameters]): Polynomial;
    /**
     * Polynomial addition method
     *
     * @param { PolynomialParameters[keyof PolynomialParameters] } addendPoly - addend polynomial
     * @returns { Polynomial } - Sum of the polynomials
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.add([1,1,1,0,1,1,0,0,1,1]);
     * console.log(result.polynomialString) // Output: x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
     * @public
    */
    add(addendPoly: PolynomialParameters[keyof PolynomialParameters]): Polynomial;
    /**
     * Polynomial subtraction method
     *
     * @param { PolynomialParameters[keyof PolynomialParameters] } subtrahendPoly - Subtrahend polynomial
     * @returns { Polynomial } - Difference between the Polynomial instance and the Polynomial parameter: subtrahendPoly
     * @example
     * const polynomial = new Polynomial('x^4 + x^1 + 1');
     * const result = polynomial.sub([1,1]);
     * console.log(result.polynomialString) // Output: x^4
     * @public
    */
    sub(subtrahendPoly: PolynomialParameters[keyof PolynomialParameters]): Polynomial;
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
     * Greatest Common Divisor of two polynomials method
     *
     * @param { PolynomialParameters[keyof PolynomialParameters] } dividendPoly - Polynomial to compute the GCD with
     * @param { number } modulo - Modulo value for division, defaults to no modulo
     * @returns { Polynomial } - Greatest Common Divisor of the current Polynomial instance and the Polynomial parameter: dividendPoly
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.gcd([1,1,1,0,1,1,0,0,1,1]);
     * console.log(result.polynomialString) // Output: x^4 + x^1 + 1
     * @public
    */
    gcd(dividendPoly: PolynomialParameters[keyof PolynomialParameters], modulo?: number): Polynomial;
    /**
     * Check if coefficients are all zero
     * Use: equivalent of null polynomial
     *
     * @returns { boolean } - True if all coefficients are zero
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * console.log(polynomial.isAllZero()) // Output: false
     * @internal
     */
    isAllZero(): boolean;
}
//# sourceMappingURL=arithmetic.d.ts.map