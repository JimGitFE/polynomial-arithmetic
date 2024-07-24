import { Polynomial } from "../arithmetic"
import { FieldPolynomial } from "../galois-field-arithmetic";

/**
 * Accepted parameter polynomial types in arithmetic methods.
 */
interface PolynomialParameters {
    polyString: polyString;
    polyCoefficients: polyCoefficients;
    polyExponents: polyExponents;
    Polynomial: Polynomial;
}

/**
 * Accepted parameter polynomial types in finite field arithmetic methods.
 */
interface FieldPolynomialParameters {
    polyString: polyString;
    polyCoefficients: polyCoefficients;
    polyExponents: polyExponents;
    FieldPolynomial: FieldPolynomial;
}

export { PolynomialParameters, FieldPolynomialParameters }