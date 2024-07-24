/**
 * String representation of a polynomial.
 * @example 'x^2 + x + 1'
*/
type polyString = string
/**
 * Coefficients representation of a polynomial.
 * @example [1,1,1] || "x^2 + x + 1"
 * @example [2,0,1] || "2x^2 + 1"
*/
type polyCoefficients = number[]
/**
 * Exponents representation of a polynomial.
 * @example [2,0,1] || "2x^2 + 1"
 * @example [2,1,0,0] || "x^2 + x + 2"
*/
type polyExponents = number[]