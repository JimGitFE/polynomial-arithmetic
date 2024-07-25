import { Polynomial } from "./arithmetic";
import { FieldPolynomial } from "./galois-field-arithmetic";
import { isPrime, powerMod } from "./utils/math";
import { filterDuplicates, arrayMax } from "./utils/polynomial";
/**
 * Internal usage math & formatting utilities
*/
declare const utils: {
    removeLZero: (poly0: number[]) => number[] | (0 | 1 | -1)[];
    polyReformat: (poly: import("./types").PolynomialParameters[keyof import("./types").PolynomialParameters], formatType?: keyof polyFormats) => [polyFormats["string"], polyFormats["coefficients"], polyFormats["exponents"]];
    gcd: ({ r0, r1 }: {
        r0: number;
        r1: number;
    }) => number;
    lcm: (a: number, b: number) => number;
    arrayGcd: (arr: number[]) => number;
    eea: ({ r0, r1 }: {
        r0: number;
        r1: number;
    }) => number;
    isAllZero: (array: number[]) => boolean;
    polyGcd: ({ p, q, modulo }: {
        p: (0 | 1 | -1)[];
        q: (0 | 1 | -1)[];
        modulo?: number;
    }) => (0 | 1 | -1)[];
    isPrime: typeof isPrime;
    powerMod: typeof powerMod;
    mod: (num: number, modulo: number) => number;
    filterDuplicates: typeof filterDuplicates;
    arrayMax: typeof arrayMax;
};
export { Polynomial, FieldPolynomial, utils };
//# sourceMappingURL=index.d.ts.map