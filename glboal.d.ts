import { Polynomial } from "./arithmetic"

/**
 * Polynomial & FieldPolynomial interpretation formats.
 */
export type PolynomialFormats = { polynomialString: string, coefficients: (0|1|-1)[], exponents: number[] }

/**
 * Accepted argument types in arithmetic methods.
 */
export type PolynomialParameters = string | (0|1|-1)[] | number[] | Polynomial
