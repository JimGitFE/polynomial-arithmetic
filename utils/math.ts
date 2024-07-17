/**
 * Check if two arrays have equal order and elements.
 * 
 * @param { any[] } a - First array to compare.
 * @param { any[] } b - Second array to compare.
 * @returns { boolean } - True if arrays are equal, false otherwise.
 * @example
 * const result = compareArrays([1, 2, 3], [1, 2, 3]);
 * console.log(result) // Output: true
 * @internal
 */
export const compareArrays = (a: any[], b: any[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Check if a number is prime.
 * 
 * @param { number } num - Number to check.
 * @returns { boolean } - True if the number is prime, false otherwise.
 * @example
 * const result = isPrime(7);
 * console.log(result) // Output: true
 * @internal
 */
export function isPrime(num: number) {
    for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

/**
 * Compute modulo of a number.
 * 
 * @param { number } num - Number to compute modulo.
 * @param { number } modulo - Modulus number.
 * @returns { number } - The modulo of the number.
 * @example
 * const result = mod(7, 3);
 * console.log(result) // Output: 1
 * @internal
 */
export const mod = function (num: number, modulo: number):number {
    if (modulo === 0) return num
    return ((num % modulo) + modulo) % modulo;
  };

// power (a ⋅ b) mod m = [(a mod m) ⋅ (b mod m)] mod m
/** 
 * Compute the power of a number modulo another number.
 * Method: Binary bitwise exponentiation, enables high exponent calculation.
 * Avoids: Exceeding int limit from large intermediate results.
 * 
 * @param { number } base - Base number.
 * @param { number } exponent - Exponent number.
 * @param { number } modulus - Modulus number.
 * @returns { number } - The power of the number modulo the modulus.
 * @example
 * const result = powerMod(2, 3, 3);
 * console.log(result) // Output: 2
 * @internal
*/
export function powerMod(base: number, exponent: number, modulus: number) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}