// Arithmetic
import { Polynomial } from "./arithmetic"
import { FieldPolynomial } from "./galois-field-arithmetic"

// Utils
import { removeLZero, polyReformat } from "./utils/formatter"
import { gcd, lcm, arrayGcd, eea, isAllZero, polyGcd} from "./utils/gcd"
import { isPrime, powerMod, mod } from "./utils/math"
import { filterDuplicates, arrayMax } from "./utils/polynomial"

/**
 * Internal usage math & formatting utilities
*/
const utils = {
    removeLZero, polyReformat, // formatter
    gcd, lcm, arrayGcd, eea, isAllZero, polyGcd, // gcd
    isPrime, powerMod, mod, // math
    filterDuplicates, arrayMax // polynomial
}

export { Polynomial, FieldPolynomial, utils }