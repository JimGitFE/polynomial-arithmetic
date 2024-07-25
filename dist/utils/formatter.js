"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyReformat = exports.removeLZero = exports.coefToExp = exports.expToCoef = exports.stringToCoef = void 0;
exports.coefToString = coefToString;
exports.isFieldPolynomial = isFieldPolynomial;
const arithmetic_1 = require("../arithmetic");
/**
 * Formats from array of coefficients to polynomial String.
 *
 * @param { polyFormats["coefficients"] } coefs - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyFormats['string'] } - The formatted polynomial. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @example
 * const formatted = coefToString([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted); // Output: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1"
 * @internal
*/
function coefToString(coefs) {
    // handle neutral
    if (coefs.length === 0 || JSON.stringify(coefs) === "[0]")
        return "0";
    // Map each coefficient to its term
    let terms = coefs.map((coef, i) => {
        if (coef === 0) {
            return '';
        }
        else {
            let exp = coefs.length - i - 1;
            // absolute coefficient, if 1|-1 dont display it unless constant term
            let coefficient = Math.abs(exp > 0 ? (Math.abs(coef) !== 1 ? coef : 0) : coef) || ""; // Math.abs("") = 0
            let exponent = exp !== 0 ? `x${exp !== 1 ? "^" + exp : ""}` : "";
            return (coef > 0 ? '+' : '-') + coefficient + exponent;
        }
    });
    // Join the terms with '+', remove leading '+', and replace '+-' with '-' // add spaces 2x+1 => 2x + 1
    return terms.join("").replace(/^\+/, '').replace(/(\+|-)/g, (sign) => sign === "+" ? " + " : " - ");
}
/**
 * Formats from polynomial String to array of coefficients.
 *
 * @param { polyFormats['string'] } polyStr - Polynomial to format. Example: "x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1 "
 * @returns { polyFormats["coefficients"] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = stringToCoef("x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1");
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
 */
const stringToCoef = (polyStr) => {
    // 1.2 Trim & split the polynomial into terms
    let terms = polyStr.replace(/\s/g, '').split(/(?=[+-])/g);
    // 1.3 Find the highest exponent
    let highestExponent = Math.max(...terms.map(term => parseInt(term.split('^')[1]) || (term.includes("x") ? 1 : 0)));
    // Initialize an array of zeros
    let coefficients = new Array(highestExponent + 1).fill(0);
    // 1.4 For each term, update the corresponding coefficient in the array
    for (let term of terms) {
        if (term === '')
            continue; // Only Independent term => [0]
        let [coef, exp] = term.split('x'); // " - 2x^ 9" => ["-2", "^9"]
        let exponent = parseInt((exp === "" ? "1" : exp === null || exp === void 0 ? void 0 : exp.split("^")[1]) || "0");
        let coefficient = !isNaN(parseInt(coef)) ? (parseInt(coef)) : (coef.startsWith('-') ? -1 : 1); // "0" => 0
        coefficients[highestExponent - exponent] = coefficient;
    }
    return coefficients;
};
exports.stringToCoef = stringToCoef;
/**
 * Formats from array of exponents to array of coefficients.
 *
 * @param { polyFormats["exponents"] } exponentArr - Polynomial to format. Example: [9,8,7,5,4,1,0]
 * @returns { polyFormats["coefficients"] } - The formatted polynomial. Example: [1,1,1,0,1,1,0,0,1,1]
 * @example
 * const formatted = expToCoef([9,8,7,5,4,1,0]);
 * console.log(formatted) // Output: [1,1,1,0,1,1,0,0,1,1]
 * @internal
*/
const expToCoef = (exponentArr) => {
    //  1.1 Define arrays with length = polynomial degree + 1
    const degree = exponentArr.length !== 0 ? Math.abs(Math.max(...exponentArr)) : 0;
    let coefArr = new Array(degree + 1).fill(0);
    //  1.2 Add 1 at each exponent positions, ex. [1,1] => [2,0]
    exponentArr.forEach((exp) => {
        if (exp == 0) {
            return coefArr[coefArr.length - 1] += 1; // Math.sign(0) = 0 => avoid 1*0
        }
        else {
            return coefArr[coefArr.length - (Math.abs(exp) + 1)] += Math.sign(exp) * 1;
        }
    });
    return [...coefArr];
};
exports.expToCoef = expToCoef;
/**
 * Formats from array of coefficients to array of exponents.
 * note: only supports whole numbers
 *
 * @param { polyFormats["coefficients"] } coefArr - Polynomial to format. Example: [1,1,1,0,1,1,0,0,1,1]
 * @returns { polyFormats["exponents"] } - The formatted polynomial. Example: [9,8,7,5,4,1,0]
 * @example
 * const formatted = coefToExp([1,1,1,0,1,1,0,0,1,1]);
 * console.log(formatted) // Output: [9,8,7,5,4,1,0]
 * @internal
*/
const coefToExp = (coefArr) => {
    return coefArr.reduce((all, num, i, arr) => Math.round(num) === num ? [...all, ...Array(Math.abs(num)).fill(Math.sign(num) * (arr.length - i - 1))] : all, []);
};
exports.coefToExp = coefToExp;
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
const removeLZero = (poly0) => {
    while (poly0[0] == 0) {
        poly0.shift();
    }
    return poly0;
};
exports.removeLZero = removeLZero;
/**
 * Translates a polynomial of any format into all representations.
 *
 * @param {PolynomialParameters} poly - The input polynomial. It can be an instance of the Polynomial class, a string representation, an exponent array representation, or a coefficient array representation.
 * @returns {[polyFormats['string'], polyFormats["coefficients"], exponents]} - An object containing the polynomial in all formats: string, coefficients array, and exponents array.
 * @throws {Error} - Throws an error if the input format is invalid.
 * @example
 * const result = polyReformat('x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1');
 * console.log(result); // Output: {polynomialString: 'x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1', coefficients: [1,1,1,0,1,1,0,0,1,1], exponents: [9,8,7,5,4,1,0]}
 * @public
 */
const polyReformat = (poly, formatType) => {
    // Polynomial Class // [1,0] => [1,0] 
    if (poly instanceof arithmetic_1.Polynomial || isFieldPolynomial(poly)) {
        return [poly.polyString, poly.polyCoefficients, poly.polyExponents];
        // String Representation // x^9 + x^8 + x^7 + x^5 + x^4 + x^1 + 1
    }
    else if (formatType ? formatType === "string" : typeof poly === 'string') {
        return [poly, stringToCoef(poly), coefToExp(stringToCoef(poly))];
        // Coefficient Array Representation // [1,1,1,0,1,1,0,0,1,1]
    }
    else if (formatType ? formatType === "coefficients" : true) {
        return [coefToString(poly), poly, coefToExp(poly)];
        // Exponent Array Representation // [9,8,7,5,4,1,0]
    }
    else if (formatType === "exponents") { // isDescending(<polyExponents>poly) - [2,1,0] = (2x^2 +x +1 || x^2 + x + 1)
        return [coefToString(expToCoef(poly)), expToCoef(poly), poly];
        // Invalid
    }
    else {
        let str = 'Invalid Polynomial Format' + poly;
        throw new Error(String(str));
    }
};
exports.polyReformat = polyReformat;
/**
 * Checks instance of FieldPolynomial. Without causing circular dependency.
 * @internal
 */
function isFieldPolynomial(obj) {
    return obj && obj.hasOwnProperty('polyExponents') && Array.isArray(obj.polyExponents);
}
//# sourceMappingURL=formatter.js.map