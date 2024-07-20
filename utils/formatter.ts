/*
// Polynomial Formatter

Exponents: Array of polynomial term exponents, x^2 + 1 => [2, 0]
Coefficients: Array of polynomial term coefficients, x^2 + 1 => [1, 0, 1]

note: polynomials in GF(2), have coefficients 0 or 1

*/
import { PolynomialParameters, polyString, polyCoefficients, polyExponents, Namings } from '../glboal';
import { Polynomial } from '../arithmetic';

/** 
 * Formats from array of coefficients to polynomial String.
 * 
 * @param { polyCoefficients } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyString } - The formatted polynomial. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1" 
 * @example
 * const formatted = coefToString([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted); // Output: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @internal
*/
export function coefToString (coefs: polyCoefficients): polyString {
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

/**
 * Formats from polynomial String to array of coefficients.
 *  
 * @param { polyString } polyStr - Polynomial to format. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1 "
 * @returns { polyCoefficients } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]  
 * @example
 * const formatted = stringToCoef("x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1");
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
 */
export const stringToCoef = (polyStr: polyString): polyCoefficients => {
    // 1.2 Split the polynomial into terms
    let terms = polyStr.split(/(?=[+-])/g);

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

/** 
 * Formats from array of exponents to array of coefficients.
 * 
 * @param { polyExponents } exponentArr - Polynomial to format. Example: [9,8,7,5,4,1,0]
 * @returns { polyCoefficients } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]  
 * @example
 * const formatted = expToCoef([9,8,7,5,4,1,0]);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
*/
export const expToCoef = (exponentArr: polyExponents): polyCoefficients => {
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

/** 
 * Formats from array of coefficients to array of exponents.
 * 
 * @param { polyCoefficients } coefArr - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyExponents } - The formatted polynomial. Example: [9,8,7,5,4,1,0]  
 * @example
 * const formatted = coefToExp([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted) // Output: [9,8,7,5,4,1,0]
 * @internal
*/
export const coefToExp = (coefArr: polyCoefficients): polyExponents => {

    return coefArr.reduce((all: polyCoefficients, num, i, arr) => num===1?[...all, (arr.length - i - 1)]:all,[])
}

/** 
 * Removes leading zeroes from array. 
 * 
 * @param { number[] } poly0 - Input Array. Example: [0,1]
 * @returns { number[] | (0|1|-1)[] } - Result Array, Example: [1]  
 * @example
 * const formatted = removeLZero([0,1]);
 * console.log(formatted) // Output: [1]
 * @internal
*/
export const removeLZero = (poly0: number[]): number[] | (0|1|-1)[] => {
    while (poly0[0] == 0) {
        poly0.shift()
    }
    return poly0
}

/** 
 * Translates a polynomial of any format into all representations.
 *
 * @param {PolynomialParameters} poly - The input polynomial. It can be an instance of the Polynomial class, a string representation, an exponent array representation, or a coefficient array representation.
 * @returns {[polyString, polyCoefficients, exponents]} - An object containing the polynomial in all formats: string, coefficients array, and exponents array.
 * @throws {Error} - Throws an error if the input format is invalid.
 * @example
 * const result = polyReformat('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * console.log(result); // Output: {polynomialString: 'x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1', coefficients: [1,1,1,0,1,1,0,0,1,1], exponents: [9,8,7,5,4,1,0]}
 * @public
 */
export const polyReformat = (poly: PolynomialParameters[keyof PolynomialParameters], formatType?: Namings ): [polyString, polyCoefficients, polyExponents] => {

    // Polynomial Class // [1,0] => [1,0] 
    if (poly instanceof Polynomial) {
        return [poly.polyString, poly.polyCoefficients, poly.polyExponents]

        // String Representation // x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
    } else if (formatType?formatType === Namings.polyString: typeof poly === 'string') {
        return [<polyString>poly, stringToCoef(<polyString>poly), coefToExp(<(0 | 1|-1)[]>stringToCoef(<polyString>poly)) ]
        
        // Coefficient Array Representation // [1,1,1,0,1,1,0,0,1,1]
    } else if (formatType?formatType === Namings.polyCoefficients: true) {
        return [coefToString(<polyCoefficients>poly), <polyCoefficients>poly, coefToExp(<polyCoefficients>poly) ]
        
        // Exponent Array Representation // [9,8,7,5,4,1,0]
    } else if (formatType === Namings.polyExponents) { // isDescending(<polyExponents>poly) - [2,1,0] = (2x^2 +x +1 || x^2 + x + 1)
        return [coefToString(expToCoef(<polyExponents>poly)), expToCoef(<polyExponents>poly), <polyExponents>poly ]
        
        // Invalid
    } else {
        let str = 'Invalid Polynomial Format'+ poly
        throw new Error(String(str))
    }

}