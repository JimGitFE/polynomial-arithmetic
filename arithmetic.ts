import type { PolynomialParameters, PolynomialConstructorParameters } from './types';
import { mod } from "./utils/math";
import { removeLZero, polyReformat, isFieldPolynomial } from "./utils/formatter";

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
export class Polynomial {
    polyCoefficients: polyFormats["coefficients"];
    polyExponents: polyFormats["exponents"];
    polyString: polyFormats['string'];
    
    constructor(
            originalPolynomial: PolynomialParameters[keyof PolynomialParameters], 
            { skipFormat = false, polyType }: PolynomialConstructorParameters = {}
        ) {
        if (skipFormat) {
            const exps = isFieldPolynomial(originalPolynomial) ? originalPolynomial.polyExponents : <polyFormats["exponents"]>originalPolynomial
            this.polyString = "";
            this.polyCoefficients = [];
            this.polyExponents = exps;
        } else {
            [this.polyString, this.polyCoefficients, this.polyExponents] = polyReformat(originalPolynomial, polyType)
        }
    }
    /*

    // Polynomial Long Division

    In GF(2) divison is performed modulo 2.

    Modulo is applied before outputting the result, thus enabling polynomail division with outputs 
    otherwise expressed in scientific notation, which loose precision on the last digits (for numbers 
    higher than  2^53 - 1). Additionally exceeding Number.MAX_VALUE, which is approximately 
    1.8e308 resulting in NaN. Both of which end up returning wrong modulo results.

    */
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
    divide (divisorParam: PolynomialParameters[keyof PolynomialParameters], modulo: number = 0) {
        const [dividend, divisor] = [this.polyCoefficients, new Polynomial(divisorParam).polyCoefficients]
        let output = [...dividend];
        let normalizer = divisor[0];

        // 1.1 Compute outputs for the difference of exponents
        for (let i = 0; i < dividend.length - divisor.length + 1; i++) {
            // 1.2 Generate new Coefficient
            output[i] /= normalizer;
            let coef = output[i];
            
            // 1.3 Insert coefficient at exponent position
            for (let j = 1; j < divisor.length; j++) {
                let coef2 = (-coef * divisor[j])
                // output[i + j] += -coef * divisor[j];
                
                // 1.4 Dividend - Result Modulo (coef already negative) 
                output[i + j] = <(0|1)>mod(coef2 + output[i + j],modulo); // 0|1 for GF(2)
            }
        }

        // 1.4 Separate quotient from remainder
        let separator = dividend.length - divisor.length + 1;
        let [quotient, remainder] = [output.slice(0, separator), removeLZero(output.slice(separator))]
        
        return { quotient: new Polynomial(quotient), remainder: new Polynomial(remainder) };
    }

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
    multiply (factorPoly: PolynomialParameters[keyof PolynomialParameters]) {
        let [a, b] = [this.polyCoefficients, new Polynomial(factorPoly).polyCoefficients]
        let output = new Array(a.length + b.length - 1).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                output[i + j] += a[i] * b[j];
            }
        }
    
        return new Polynomial(output);
    }

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
    add (addendPoly: PolynomialParameters[keyof PolynomialParameters]) {
        let [a, b] = [this.polyCoefficients, new Polynomial(addendPoly).polyCoefficients]
        let output = new Array(Math.max(a.length, b.length)).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            let [ai, bi] = [a[a.length-i-1],b[b.length-i-1]]
            output[output.length-i-1] = (ai || 0) + (bi || 0);
        }
    
        return new Polynomial(removeLZero(output));
    }

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
    sub (subtrahendPoly: PolynomialParameters[keyof PolynomialParameters]) {
        let [a, b] = [this.polyCoefficients, new Polynomial(subtrahendPoly).polyCoefficients]
        let output = new Array(Math.max(a.length, b.length)).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            let [ai, bi] = [a[a.length-i-1],b[b.length-i-1]]
            output[output.length-i-1] = (ai || 0) - (bi || 0);
        }
    
        return new Polynomial(removeLZero(output));
    }

    /**
     * Polynomial derivative method
     * @returns { Polynomial } - Derivative of the polynomial
     * @example
     * const polynomial = new Polynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.derivative();
     * console.log(result.polynomialString) // Output: 9x^8 + 8x^7 + 7x^6 + 5x^4 + 4x^3 + x^1
     * @public
     */
    derivative () {
        let output = new Array(this.polyCoefficients.length - 1).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            output[i] = this.polyCoefficients[i] * (this.polyCoefficients.length - 1 - i);
        }
    
        return new Polynomial(removeLZero(output));
    }

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
    gcd (dividendPoly: PolynomialParameters[keyof PolynomialParameters], modulo: number = 0) {
        let [p, q]: Polynomial[] = [new Polynomial(dividendPoly), this]

        // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
        while (!q.isAllZero()) {
            let remainder: Polynomial
    
            // 1.2 Compute Remainder
            remainder = p.divide(q, modulo).remainder
    
            p = q
            q = remainder // remainder can contain left zero
        }
        
        return p // p is d / d divides p & q 
    }

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
    isAllZero():boolean {
        return this.polyCoefficients.every(val => val === 0);
    }
}