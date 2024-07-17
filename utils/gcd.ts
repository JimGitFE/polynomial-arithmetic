import { Polynomial } from "../arithmetic"

// Euclidean GCD of two numbers
export const gcd = ({r0, r1}: {r0: number, r1: number}) => {
    while (r1 !== 0) {
        [r0, r1] = [r1, r0 % r1]
    }
    return r0
}

export const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd({r0: a, r1: b});
}

// Compute gcd of many numbers, test setwise coprime array
export const arrayGcd = (arr: number[]) => {
    if (arr.length == 0) {
        return arr[0]
    } else {
        let result = arr[0]
        arr.forEach(num => {
            result = gcd({r0: num, r1: result})
            if (result == 1) {return result} // stop computing

        })
        return result
    }
} 

// Extended Euclidean Aalgorithm, Multiplicative inverse of r0 mod r1
export const eea = ({r0, r1}: {r0: number, r1: number}) => { // dividend, divisor
    let t0 = 0, t1 = 1, q, t
    while (r0 > 0) {
        q = Math.floor(r1 / r0) // quotient
        t = t0 - q * t1
        t0 = t1 // swap t1 to t0
        t1 = t // swap T to t1
        t = r1 % r0 
        r1 = r0 // swap r0 to r1
        r0 = t // remainder => divisor
    }
    return t0
}

// return true on array of zeroes, ex. [0,0] => true, [0,1] => false
export const allZero = (array: number[]): boolean => {
    return array.every(val => val === 0);
}

// Euclidean GCD for Polynomials Modulo some number,
// returns & inputs coefficients array type, ex. [3,0,1] not [2,2,2,1] // 3x^2+1
export const polyGcd = ({p,q, modulo = 0}:{p: (0|1|-1)[], q: (0|1|-1)[], modulo?: number}) => {

    // 1.1 Loop until remainder is 0, then gcd(p,q) = previous remainder
    while (!allZero(q)) {
        let remainder: number[]

        // 1.2 Compute Remainder
        if (modulo) {remainder = new Polynomial(p).divide(q, modulo).remainder.coefficients}
        // if (modulo) {remainder = polyDiv({dividend: p, divisor: q, modulo}).remainder}
        else {remainder = new Polynomial(p).divide(q).remainder.coefficients}
        // else {remainder = polyDiv({dividend: p, divisor: q}).remainder}

        p = q
        q = remainder as (0 | 1 | -1)[] // remainder can contain left zero
    }
    
    return p // p is d / d divides p & q 
}