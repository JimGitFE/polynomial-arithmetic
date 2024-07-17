/*
// Polynomial Formatter

Exponents: Array of polynomial term exponents, x^2 + 1 => [2, 0]
Coefficients: Array of polynomial term coefficients, x^2 + 1 => [1, 0, 1]

note: polynomials in GF(2), have coefficients 0 or 1

*/

import { Polynomial, PolynomialParameters, PolynomialFormats } from '../arithmetic';

/** @returns [1,1,1,0,1,1,0,0,1,1] => x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1  */
export function coefToString (coefs: number[]): string {
    // Map each coefficient to its term
    let terms = coefs.map((coef, i) => {
        if (coef === 0) {
            return '';
        } else {
            let exp = coefs.length - i - 1;
            // absolute coefficient, if 1|-1 dont display it unless constant term
            let coefficient = Math.abs(exp>0?(Math.abs(coef)!==1?coef:0):coef) || "" // Math.abs("") = 0
            let exponent = exp>0?`x^${exp}`:""

            return (coef > 0 ? '+' : '-') + coefficient + exponent;
        }
    });

    // Join the terms with '+', remove leading '+', and replace '+-' with '-' // add spaces 2x+1 => 2x + 1
    return terms.join("").replace(/^\+/, '').replace(/(\+|-)/g, (sign)=>sign==="+"?" + ":" - ")
}

/** @returns x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1 => [1,1,1,0,1,1,0,0,1,1]  */
export const stringToCoef = (coefs: string): number[] => {
    // 1.2 Split the polynomial into terms
    let terms = coefs.split(/(?=[+-])/g);

    // 1.3 Find the highest exponent
    let highestExponent = Math.max(...terms.map(term => parseInt(term.split('^')[1]) || (term.includes("x")?1:0)));

    // Initialize an array of zeros
    let coefficients = new Array(highestExponent + 1).fill(0);

    // 1.4 For each term, update the corresponding coefficient in the array
    for (let term of terms) {
        let parts = term.split('x'); // "-2x^9" => ["-2", "^9"]
        
        let exponent = parseInt( parts[1]!==undefined ? (parts[1].split("^")[1] || "1") : "0" );
        let coefficient = parseInt(parts[0]) || (parts[0].startsWith('-') ? -1 : 1);
        
        coefficients[highestExponent - exponent] = coefficient;
    }

    return coefficients;
}

/** @returns [9,8,7,5,4,1,0] => [1,1,1,0,1,1,0,0,1,1]  */
export const expToCoef = (exponentArr: number[]): (0 | 1|-1)[] => {
    //  1.1 Define arrays with length = polynomial degree + 1
    let coefArr = new Array(Math.abs(Math.max(...exponentArr))+1).fill(0)

    //  1.2 Add 1 at each exponent positions, ex. [1,1] => [2,0]
    exponentArr.forEach((exp) => {
        if (exp == 0) {
            return coefArr[coefArr.length-1] += 1 // Math.sign(0) = 0 => avoid 1*0
        } else {
            return coefArr[coefArr.length - (Math.abs(exp) + 1)] += Math.sign(exp)*1
        }
    });
    
    return [...coefArr]
}

/** @returns [1,1,1,0,1,1,0,0,1,1] => [9,8,7,5,4,1,0]  */
export const coefToExp = (coefArr: (0 | 1|-1)[]): number[] => {

    return coefArr.reduce((all: number[],num,i,arr)=>num===1?[...all, (arr.length - i - 1)]:all,[])
}

/** @returns Remove left zeroes from array, ex. [0,1] => [1]  */
export const removeLZero = (poly0: number[]): number[] | (0|1|-1)[] => {
    while (poly0[0] == 0) {
        poly0.shift()
    }
    return poly0
}

/** @returns Translate Polynomial to all Representations | Formats  */
export const polyReformat = (poly: PolynomialParameters ): PolynomialFormats => {

    // Polynomial Class // [1,0] => [1,0] 
if (poly instanceof Polynomial) {
    return poly.polyFormats

    // String Representation // x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
} else if (typeof poly === 'string') {
    return {polynomialString: poly, coefficients: <(0 | 1|-1)[]>stringToCoef(poly), exponents: coefToExp(<(0 | 1|-1)[]>stringToCoef(poly))}

    // Exponent Array Representation // [9,8,7,5,4,1,0]
} else if (poly.some((term: number) => term>1)) {
    return {polynomialString: coefToString(expToCoef(poly)), coefficients: expToCoef(poly), exponents: poly}
    
    // Coefficient Array Representation // [1,1,1,0,1,1,0,0,1,1]
} else if (poly.every((coef: number) => [0, 1, -1].includes(coef))) {
    return {polynomialString: coefToString(poly), coefficients: <(0|1|-1)[]>poly, exponents: coefToExp(<(0|1|-1)[]>poly)}
    
    // Invalid
} else {
    let str = 'Invalid Polynomial Format'+ poly
    throw new Error(String(str))
}

}