import type { Polynomial } from "../arithmetic";
import type { FieldPolynomial } from "../galois-field-arithmetic";
import type { polyFormats } from "./enums";
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
/**
 * Optional setting constructor parameters for Polynomial class.
 * @example
 *
 */
interface PolynomialConstructorParameters {
    skipFormat?: boolean;
    polyType?: polyFormats;
}
export { PolynomialParameters, FieldPolynomialParameters, PolynomialConstructorParameters };
//# sourceMappingURL=index.d.ts.map