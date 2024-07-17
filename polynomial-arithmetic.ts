import { mod } from "./math";
import { removeLZero, polyReformat } from "./polynomial-formatter";

export type PolynomialFormats = { polynomialString: string, coefficients: (0|1|-1)[], exponents: number[] }
export type PolynomialParameters = string | (0|1|-1)[] | number[] | Polynomial

// OOP Polynomial class with arithmetic properties
export class Polynomial {
    polyFormats: PolynomialFormats;
    coefficients:(0|1|-1)[];
    exponents: number[];
    polynomialString: string;
    
    constructor(originalPolynomial: PolynomialParameters, {onlyExps}: {onlyExps?: boolean} = {onlyExps: false}) {
        if (onlyExps) {
            this.polyFormats = {coefficients: [], exponents: <number[]>originalPolynomial, polynomialString: ""}
        } else {
            this.polyFormats = polyReformat(originalPolynomial)
        }
        // Assign formats to class properties directly from nested object property
        [this.coefficients, this.exponents, this.polynomialString] = [this.polyFormats.coefficients, this.polyFormats.exponents, this.polyFormats.polynomialString]
    }
    /*

    // Polynomial Long Division

    In GF(2) divison is performed modulo 2.

    Modulo is applied before outputting the result, thus enabling polynomail division with outputs 
    otherwise expressed in scientific notation, which loose precision on the last digits (for numbers 
    higher than  2^53 - 1). Additionally exceeding Number.MAX_VALUE, which is approximately 
    1.8e308 results in NaN. Both of which return wrong modulo results.

    */
    divide (divisorParam: PolynomialParameters, modulo: number = 2): {remainder: Polynomial, quotient: Polynomial} {
        const [dividend, divisor] = [this.coefficients, polyReformat(divisorParam).coefficients]
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

    multiply (a: number[], b: number[]) {
        let output = new Array(a.length + b.length - 1).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                output[i + j] += a[i] * b[j];
            }
        }
    
        return new Polynomial(output);
    }

    add (a: number[], b: number[]) {
        let output = new Array(Math.max(a.length, b.length)).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            output[i] = a[i] || 0 + b[i] || 0;
        }
    
        return new Polynomial(removeLZero(output));
    }

    sub (a: number[], b: number[]) {
        let output = new Array(Math.max(a.length, b.length)).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            output[i] = a[i] || 0 - b[i] || 0;
        }
    
        return new Polynomial(removeLZero(output));
    }

    // Polynomial Derivative
    derivative () {
        let output = new Array(this.coefficients.length - 1).fill(0);
        // 1.1 Compute coefficient for each possible term
        for (let i = 0; i < output.length; i++) {
            output[i] = this.coefficients[i + 1] * (i + 1);
        }
    
        return new Polynomial(removeLZero(output));
    }

    isAllZero():boolean {
        return this.polyFormats.coefficients.every(val => val === 0);
    }
}
 /*
101
  0
101

10100
  101
10001
*/
