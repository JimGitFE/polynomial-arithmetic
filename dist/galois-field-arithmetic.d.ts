import { PolynomialParameters } from "./glboal";
import { Polynomial } from "./arithmetic";
/**
 * FieldPolynomial class with arithmetic methods for polynomials in GF(2).
 * @class
 * @extends Polynomial
 * @example
 * const polynomial = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * const result = polynomial.divideGF(new FieldPolynomial('x^4 + x^1 + 1'));
 * console.log(result.remainder.polynomialString) // Output: x^4 + x^1 + 1
 * @public
 */
export declare class FieldPolynomial extends Polynomial {
    constructor(originalPoly: PolynomialParameters, { fast }?: {
        fast?: boolean;
    });
    /**
     * Compute the division of two polynomials in GF(2).
     * Method: Optimized polynomial long division
     *
     * @param { FieldPolynomial } divisorPoly - Divisor polynomial
     * @returns {{ remainder: FieldPolynomial, quotient: FieldPolynomial }} - Remainder and quotient of the division
     * @example
     * const polynomial = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.divideGF(new FieldPolynomial('x^4 + x^1 + 1'));
     * console.log(result.remainder.polynomialString) // Output: x^4 + x^1 + 1
     * @public
    */
    divideGF(divisorPoly: FieldPolynomial, { fast }?: {
        fast?: boolean;
    }): {
        remainder: FieldPolynomial;
        quotient: FieldPolynomial;
    };
    /**
     * Compute the multiplication of two polynomials in GF(2).
     * Method: Bitwise Multiplication
     *
     * @param { FieldPolynomial } multiplier - Multiplier polynomial
     * @returns { FieldPolynomial } - Product of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.multiplyGF(new FieldPolynomial('x^3 + x + 1'));
     * console.log(result.polynomialString) // Output: x^4 + x^2 + 1
     * @public
    */
    multiplyGF(multiplier: FieldPolynomial, { fast }?: {
        fast?: boolean;
    }): FieldPolynomial;
    /**
     * Compute the addition of two polynomials in GF(2).
     * Method: Bitwise XOR of two polynomials
     *
     * @param { FieldPolynomial } poly - Addend polynomial
     * @returns { FieldPolynomial } - Sum of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.addGF(new FieldPolynomial('x^3 + x + 1'));
     * console.log(result.polynomialString) // Output: x^4 + x^2 + 1
     * @public
     */
    addGF(poly: FieldPolynomial, { fast }?: {
        fast?: boolean;
    }): FieldPolynomial;
    /**
     * Compute the subtraction of two polynomials.
     * Method: Bitwise XOR of two polynomials
     * @public
    */
    subGF: (poly: FieldPolynomial, { fast }?: {
        fast?: boolean;
    }) => FieldPolynomial;
    /**
     * Compute the greatest common divisor of two polynomials in GF(2).
     *
     * @param { FieldPolynomial } poly - Polynomial to compute GCD with
     * @param { number } modulo - Optimized for GF(2), defaults to 2
     * @returns { FieldPolynomial } - GCD of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.polyGCD(new FieldPolynomial('x^3 + x + 1'));
     * console.log(result.polynomialString) // Output: x^3 + x + 1
     * @public
    */
    polyGCD(poly: FieldPolynomial, modulo?: number): FieldPolynomial;
    /**
     * Check if polynomial is irreducible.
     * Method: Rabin's test of irreducibility, x^(n/i) mod f(x) = 1, every i prime divisors of n
     *
     * @returns {boolean} - True if polynomial is irreducible
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * console.log(polynomial.isIrreducible()) // Output: true
     * @public
    */
    isIrreducible(): boolean;
    /**
     * Check if polynomial is primitive.
     * Method: only x ** ((2**degree) -1) mod f(x) = 1, every prime divisor d of (2**degree - 1), x^d mod f(x) !== 1
     *
     * @returns {boolean} - True if polynomial is primitive
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * console.log(polynomial.isPrimitive()) // Output: true
     * @public
    */
    isPrimitive(): boolean;
    /**
     * Check if polynomial exponents are setwise coprime.
     * Method: GCD of all exponents is 1
     *
     * @returns {boolean} - True if polynomial is setwise coprime
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * console.log(polynomial.isSetwiseCoprime()) // Output: true
     * @public
    */
    isSetwiseCoprime(): boolean;
}
//# sourceMappingURL=galois-field-arithmetic.d.ts.map