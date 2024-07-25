import type { Polynomial } from "../arithmetic";
import type { FieldPolynomial } from "../galois-field-arithmetic";
/**
 * Accepted parameter polynomial types in arithmetic methods.
 */
interface PolynomialParameters {
    polyString: polyFormats['string'];
    polyCoefficients: polyFormats["coefficients"];
    polyExponents: polyFormats["exponents"];
    Polynomial: Polynomial;
}
/**
 * Accepted parameter polynomial types in finite field arithmetic methods.
 */
interface FieldPolynomialParameters {
    polyString: polyFormats['string'];
    polyCoefficients: polyFormats["coefficients"];
    polyExponents: polyFormats["exponents"];
    FieldPolynomial: FieldPolynomial;
}
/**
 * Optional setting constructor parameters for Polynomial class.
 * @example
 *
 */
interface PolynomialConstructorParameters {
    skipFormat?: boolean;
    polyType?: keyof polyFormats;
}
export { PolynomialParameters, FieldPolynomialParameters, PolynomialConstructorParameters };
//# sourceMappingURL=index.d.ts.map