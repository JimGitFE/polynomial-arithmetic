/**
 * Naming interface of each polynomial representation.
 *
 * @remarks
 * This interface provides a set of string literals representing various naming conventions:
 * - `"string"`: String representation of a polynomial.
 * - `"coefficients"`: Coefficients representation of a polynomial.
 * - `"exponents"`: Exponents representation of a polynomial.
*/
interface polyFormats {
    /**
     * String representation of a polynomial.
     * @example 'x^2 + x + 1'
    */
    string: string;
    /**
     * Coefficients representation of a polynomial.
     * @example [1,1,1] || "x^2 + x + 1"
     * @example [2,0,1] || "2x^2 + 1"
    */
    coefficients: number[];
    /**
     * Exponents representation of a polynomial.
     * @example [2,0,1] || "2x^2 + 1"
     * @example [2,1,0,0] || "x^2 + x + 2"
    */
    exponents: number[];
}