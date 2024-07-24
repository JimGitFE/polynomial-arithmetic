"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.FieldPolynomial = exports.Polynomial = void 0;
// Arithmetic
const arithmetic_1 = require("./arithmetic");
Object.defineProperty(exports, "Polynomial", { enumerable: true, get: function () { return arithmetic_1.Polynomial; } });
const galois_field_arithmetic_1 = require("./galois-field-arithmetic");
Object.defineProperty(exports, "FieldPolynomial", { enumerable: true, get: function () { return galois_field_arithmetic_1.FieldPolynomial; } });
// Utils
const formatter_1 = require("./utils/formatter");
const gcd_1 = require("./utils/gcd");
const math_1 = require("./utils/math");
const polynomial_1 = require("./utils/polynomial");
/**
 * Internal usage math & formatting utilities
*/
const utils = {
    removeLZero: formatter_1.removeLZero, polyReformat: formatter_1.polyReformat,
    gcd: gcd_1.gcd, lcm: gcd_1.lcm, arrayGcd: gcd_1.arrayGcd, eea: gcd_1.eea, isAllZero: gcd_1.isAllZero, polyGcd: gcd_1.polyGcd,
    isPrime: math_1.isPrime, powerMod: math_1.powerMod, mod: math_1.mod,
    filterDuplicates: polynomial_1.filterDuplicates, arrayMax: polynomial_1.arrayMax
};
exports.utils = utils;
//# sourceMappingURL=index.js.map