import { FieldPolynomialParameters, PolynomialParameters } from './types';
import { Polynomial } from "./arithmetic";
import { filterDuplicates, arrayMax } from './utils/polynomial';
import { arrayGcd } from "./utils/gcd";
import { isPrime } from "./utils/math";

/**
 * FieldPolynomial class with arithmetic methods for polynomials in GF(2).
 * @extends Polynomial
 * @example
 * const polynomial = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * const result = polynomial.divideGF(new FieldPolynomial('x^4 + x^1 + 1'));
 * console.log(result.remainder.polyString) // Output: x^4 + x^1 + 1
 * @public
 */
export class FieldPolynomial extends Polynomial {
    // Constructor // note. fast works only with exponents
    constructor(originalPoly: PolynomialParameters[keyof PolynomialParameters], {fast}: {fast?: boolean} = {fast: false}) {
        super(originalPoly, {onlyExps: fast})
    }

    /**
     * Compute the division of two polynomials in GF(2).
     * Method: Optimized polynomial long division
     * 
     * @param { FieldPolynomialParameters } divisorPoly - Divisor polynomial
     * @returns {{ remainder: FieldPolynomial, quotient: FieldPolynomial }} - Remainder and quotient of the division
     * @example
     * const polynomial = new FieldPolynomial('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
     * const result = polynomial.divideGF('x^4 + x^1 + 1');
     * console.log(result2.quotient.polyString) // Output: 5x^5 + 4x^4 + 3x^3 + 2x^2 + x
     * console.log(result2.remainder.polyString) // Output: 1
     * @public 
    */
    divideGF (divisorPoly: FieldPolynomialParameters[keyof FieldPolynomialParameters]): {remainder: FieldPolynomial, quotient: FieldPolynomial} {
        const divisor = new FieldPolynomial(divisorPoly, {fast: true}).polyExponents
        let [quotient, remainder, i]:[number[], number[], number] = [[], [...this.polyExponents], 0] // remainder = dividend
        let [remainderDeg, divisorDeg] = [arrayMax(remainder), arrayMax(divisor)]

        while ((remainderDeg-divisorDeg)>=0 && remainder.length !== 0) {

            // 1.1 Compute i Exponent of Quotient
            quotient.push(remainderDeg - divisorDeg) // [1]

            // 1.2 Compute Remainder, if duplicate => remove since working modulo 2
            console.log(divisor)
            remainder = filterDuplicates(divisor.map((exp)=>exp+quotient[i]),remainder) // [3,4,1] unsorted!

            // 1.3 Update dividend => divide again
            i++, remainderDeg = arrayMax(remainder)
        }
        
        return {quotient: new FieldPolynomial(quotient, {fast: true}), remainder: new FieldPolynomial(remainder, {fast: true})}
    }

    /**
     * Compute the multiplication of two polynomials in GF(2).
     * Method: Bitwise Multiplication
     * 
     * @param { FieldPolynomialParameters } multiplier - Multiplier polynomial
     * @returns { FieldPolynomial } - Product of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.multiplyGF('x^3 + x + 1');
     * console.log(result.polyString) // Output: x^7 + x^6 + x^4 + x^3 + 1
     * @public 
    */
    multiplyGF (multiplier: FieldPolynomialParameters[keyof FieldPolynomialParameters], {fast}:{fast?:boolean} = {}): FieldPolynomial {
        let intA, intB, intP = 0, modulo = 2;
    
        // 1.1 Convert to integers // [1,0,1] => 5
        [intA,intB] = [parseInt(this.polyCoefficients.join(''), 2), parseInt(new FieldPolynomial(multiplier, {fast}).polyCoefficients.join(''), 2)]
        
        // 1.2 Bitwise Multiplication
        while ( intB > 0) {
            if (intB & 1) {
                intP ^= intA;
            }
            
            // 1.3 Offset a until last digit b is 1
            intB >>= 1;
            intA <<= 1;
        }
        return new FieldPolynomial(intP.toString(2).split("").map(str=>Number(str), {fast}))
    }

    /**
     * Compute the addition of two polynomials in GF(2).
     * Method: Bitwise XOR of two polynomials
     * 
     * @param { FieldPolynomialParameters } poly - Addend polynomial
     * @returns { FieldPolynomial } - Sum of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.addGF(new FieldPolynomial('x^3 + x + 1'));
     * console.log(result.polyString) // Output: x^4 + x^2 + 1
     * @public
     */
    addGF (poly: FieldPolynomialParameters[keyof FieldPolynomialParameters], {fast}:{fast?:boolean} = {}): FieldPolynomial {

        // 1.1 Convert to integers & Bitwise Add // [1,0,1] => 5
        const result = parseInt(this.polyCoefficients.join(''), 2) ^ parseInt(new FieldPolynomial(poly, {fast}).polyCoefficients.join(''), 2)
                
        // 1.2 Reformat from Integer to coefficients array // ex. 5 => [1,0,1]
        return new FieldPolynomial(result.toString(2).split("").map(str=>Number(str)), {fast})
    }
    /**
     * Compute the subtraction of two polynomials.
     * Method: Bitwise XOR of two polynomials
     * @public
    */
    subGF = this.addGF

    /**
     * Compute the greatest common divisor of two polynomials in GF(2).
     * 
     * @param { FieldPolynomialParameters } poly - Polynomial to compute GCD with
     * @param { number } modulo - Optimized for GF(2), defaults to 2
     * @returns { FieldPolynomial } - GCD of two polynomials
     * @example
     * const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1');
     * const result = polynomial.polyGCD(new FieldPolynomial('x^3 + x + 1'));
     * console.log(result.polyString) // Output: x^3 + x + 1 
     * @public
    */
    polyGCD (poly: FieldPolynomialParameters[keyof FieldPolynomialParameters], modulo: number = 2): FieldPolynomial {
        let p = new FieldPolynomial(poly)
        let q = <FieldPolynomial>this

        // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
        while (q.polyExponents.length !== 0) {

            // 1.2 Compute Remainder
            let { remainder } = p.divideGF(q, {fast: true})
            p = q
            q = new FieldPolynomial(remainder.polyExponents, {fast: true}) // remainder can contain left zero
        }
        return p // p is d (d divides original p & q)
    }

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
    isIrreducible (): boolean {
        const n = this.polyExponents[0]
        let sequence = [2**n] // exponents 2^n, & prime divisor q of n

        // 2.1 Compute all common prime divisors of n
        for(let i = 2; i <= n; i++) {
            if(n % i === 0 && isPrime(i)) {
                sequence.push(2**(n/i));
            }
        }

        // 2.2 See if divisible
        for (let i = 0; i < sequence.length; i++) {
            const exp = sequence[i]
            if (i !== 0) {

                // 2.3 GCD(f, x^2^(n/q) − x) = 1
                let gcdRes = this.polyGCD(new FieldPolynomial([exp,1], {fast: true})).polyExponents
                if ( gcdRes[gcdRes.length-1] !== 0 ) return false // gcd !== [0]
            } else {

                // 2.4 Divides x^2^n ≡ x mod f // remainder = 0
                let { remainder } = new FieldPolynomial([exp,1], {fast: true}).divideGF(this, {fast: true})
                if ( remainder.polyExponents.length !== 0 ) return false // [] !== []
            }
        }

        return true
    }

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
    isPrimitive (): boolean {
        const n = this.polyExponents[0] // degree
        let remainder: number[] = []

        // 3.1 Compute prime divisors of (2**n - 1)
        let primeDivisors: number[] = []
        for(let i = 2; i < (2**n - 1)/2; i++) {
            if(((2**n - 1) % i === 0) && isPrime(i)) {
                primeDivisors.push(i);
            }
        }

        // 3.2 For every divisor (d) of (2^n - 1), (x^d mod f(x)) !== 1 => order is not x^d
        for (let i = 0; i < primeDivisors.length; i++) {
            let exponent = primeDivisors[i]
            remainder = new FieldPolynomial([exponent], {fast: true}).divideGF(this, {fast: true}).remainder.polyExponents
            if (remainder[remainder.length-1]===0) return false // remainder !== 1
        }
        
        // 3.3 Verify x^(2^n - 1) mod f(x) = 1
        remainder = new FieldPolynomial([(2**n)-1], {fast: true}).divideGF(this, {fast: true}).remainder.polyExponents
        return remainder[remainder.length-1]===0 // remainder === 1
    }

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
    isSetwiseCoprime (): boolean {
        return arrayGcd(this.polyExponents) == 1
    }
    
}

/*

Not Primitive

 x^2 + 1 // wikipedia, primitive examples
 x^4 + x^2 + x + 1 // math.stack

Primitive over GF(2^n)

 x^7 + x^6 + 1
 x^3 + x + 1
 x^3 + x^2 + 1

 x^4 + x + 1
 x^4 + x^3 + 1
 x^10 + x^3 + 1

Irreducible only polynomials

 x^4 + x^3 + x^2 + x + 1
 x^10 + x^3 + 1
 x^10 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1
 
Reducible polynomials
 
 x^4 + x^2 + 1
 x^4 + x^3 + x + 1
 x^8 + x^5 + x^4 + x^2 + 1

 x^5 + x^3 + x + 1 // ?
 x^5 + x^4 + x^3 + x^2 + x-1 // ?

 ...
 x^8 + x^5 + x^4 + x^2 + 1
 x^8 + x^6 + x^5 + x^4 + x^3 + x^2 + 1
 x^8 + x^1 + 1
 x^8 + x^6 + x^3 + x^1 + 1
 x^8 + x^7 + x^5 + x^4 + x^3 + x^1 + 1
 x^8 + x^5 + x^2 + x^1 + 1
 x^8 + x^4 + x^2 + x^1 + 1
 x^8 + x^7 + x^6 + x^5 + x^4 + x^3 + x^2 + x^1 + 1
 
 ...
 x^9 + x^7 + x^4 + x^1 + 1
 x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
 x^9 + x^8 + x^7 + x^5 + x^3 + x^1 + 1
 x^9 + x^5 + x^2 + x^1 + 1
 x^9 + x^8 + x^6 + x^4 + x^2 + x^1 + 1
 x^9 + x^8 + x^5 + x^4 + x^2 + x^1 + 1
 x^9 + x^8 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1
 x^9 + x^8 + x^7 + x^6 + x^4 + x^3 + x^2 + x^1 + 1
 ...
 x^10 + x^7 + x^5 + x^4 + x^2 + x^1 + 1
 x^10 + x^9 + x^8 + x^7 + x^5 + x^4 + x^2 + x^1 + 1
 x^10 + x^9 + x^8 + x^7 + x^5 + x^3 + x^2 + x^1 + 1
 x^10 + x^9 + x^8 + x^6 + x^5 + x^3 + x^2 + x^1 + 1
 x^10 + x^8 + x^7 + x^6 + x^5 + x^3 + x^2 + x^1 + 1
 x^10 + x^9 + x^4 + x^3 + x^2 + x^1 + 1
 x^10 + x^6 + x^4 + x^3 + x^2 + x^1 + 1

 x^169 + x^2 + 1

*/
