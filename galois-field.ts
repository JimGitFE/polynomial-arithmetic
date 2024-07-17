
import { Polynomial, PolynomialParameters } from "./arithmetic";
import { filterDuplicates, arrayMax } from './utils/polynomial';
import { arrayGcd } from "./utils/gcd";
import { isPrime } from "./utils/math";


export class FieldPolynomial extends Polynomial {
    // Constructor // note. fast works only with exponents
    constructor(originalPoly: PolynomialParameters, {fast}: {fast?: boolean} = {fast: false}) {
        super(originalPoly, {onlyExps: fast})
    }

    // Efficient Division Algorithm, only GF(2)
    divideGF (divisorPoly: FieldPolynomial, {fast}:{fast?:boolean}={fast:false}): {remainder: FieldPolynomial, quotient: FieldPolynomial} {
        const divisor = divisorPoly.exponents
        let [quotient, remainder, i]:[number[], number[], number] = [[], [...this.exponents], 0] // remainder = dividend
        let [remainderDeg, divisorDeg] = [arrayMax(remainder), arrayMax(divisor)]

        while ((remainderDeg-divisorDeg)>=0 && remainder.length !== 0) {

            // 1.1 Compute i Exponent of Quotient
            quotient.push(remainderDeg - divisorDeg) // [1]

            // 1.2 Compute Remainder, if duplicate => remove since working modulo 2
            remainder = filterDuplicates(divisor.map(exp=>exp+quotient[i]),remainder) // [3,4,1] unsorted!
            i++, remainderDeg = arrayMax(remainder)
        }
        
        return {quotient: new FieldPolynomial(quotient, {fast}), remainder: new FieldPolynomial(remainder, {fast})}
    }

    // Efficient Bitwise Multiplication Algorithm, only GF(2)
    multiplyGF (multiplierPoly: FieldPolynomial, {fast}:{fast?:boolean} = {}): FieldPolynomial {
        let intA, intB, intP = 0, modulo = 2;
    
        // 1.1 Convert to integers // [1,0,1] => 5
        [intA,intB] = [parseInt(this.coefficients.join(''), 2), parseInt(multiplierPoly.coefficients.join(''), 2)]
        
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

    // Efficient Bitwise Addition & Subtraction Algorithm, only GF(2)
    addGF (poly: FieldPolynomial, {fast}:{fast?:boolean} = {}): FieldPolynomial {

        // 1.1 Convert to integers & Bitwise Add // [1,0,1] => 5
        const result = parseInt(this.coefficients.join(''), 2) ^ parseInt(poly.coefficients.join(''), 2)
                
        // 1.2 Reformat from Integer to coefficients array // ex. 5 => [1,0,1]
        return new FieldPolynomial(result.toString(2).split("").map(str=>Number(str)), {fast})
    }
    subGF = this.addGF

    // Euclidean GCD of two polynomials optimized for GF(2)
    polyGCD (poly: FieldPolynomial, modulo: number = 2): FieldPolynomial {
        let p = poly
        let q = <FieldPolynomial>this

        // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
        while (q.exponents.length !== 0) {

            // 1.2 Compute Remainder
            let { remainder } = p.divideGF(q, {fast: true})
            p = q
            q = new FieldPolynomial(remainder.exponents, {fast: true}) // remainder can contain left zero
        }
        return p // p is d (d divides original p & q)
    }

    // 2. Check if Irreducible, Rabin's test of irreducibility, x^(n/i) mod f(x) = 1, every i prime divisors of n
    isIrreducible (): boolean {
        const n = this.exponents[0]
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
                let gcdRes = this.polyGCD(new FieldPolynomial([exp,1], {fast: true})).exponents
                if ( gcdRes[gcdRes.length-1] !== 0 ) return false // gcd !== [0]
            } else {

                // 2.4 Divides x^2^n ≡ x mod f // remainder = 0
                let { remainder } = new FieldPolynomial([exp,1], {fast: true}).divideGF(this, {fast: true})
                if ( remainder.exponents.length !== 0 ) return false // [] !== []
            }
        }

        return true
    }

    // 3. Check if Primitive, only x ** ((2**degree) -1) mod f(x) = 1
    isPrimitive (): boolean {
        const n = this.exponents[0] // degree
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
            remainder = new FieldPolynomial([exponent], {fast: true}).divideGF(this, {fast: true}).remainder.exponents
            if (remainder[remainder.length-1]===0) return false // remainder !== 1
        }
        
        // 3.3 Verify x^(2^n - 1) mod f(x) = 1
        remainder = new FieldPolynomial([(2**n)-1], {fast: true}).divideGF(this, {fast: true}).remainder.exponents
        return remainder[remainder.length-1]===0 // remainder === 1
    }

    // 4. Test if set of taps is setwise co-prime
    isSetwiseCoprime (): boolean {
        return arrayGcd(this.exponents) == 1
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
