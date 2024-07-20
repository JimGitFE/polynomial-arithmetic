import { Polynomial } from "./arithmetic"

/**
 * Polynomial & FieldPolynomial interpretation formats.
 */
export type PolynomialFormats = { polynomialString: string, coefficients: (0|1|-1)[], exponents: number[] }

export enum PolynomialFormatsEnum {
    polynomialString = "polynomialString",
    coefficients = "coefficients",
    exponents = "exponents"
}


export interface Formats {
    polynomialString: string,
    coefficients: number[],
    exponents: number[]
}

/**
 * Accepted argument types in arithmetic methods.
 */
export type PolynomialParameters = Formats['polynomialString'] | Formats['coefficients'] | Formats['exponents'] | Polynomial