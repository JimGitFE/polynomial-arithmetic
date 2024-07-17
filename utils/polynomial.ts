/**
 * Returns array with unique values from two arrays.
 * Usage: Bitwise division algorithm, only GF(2).
 * 
 * @param { number[] } array1 - First array to compare.
 * @param { number[] } array2 - Second array to compare.
 * @returns { number[] } - Array with unique values from both arrays.
 * @example
 * const result = filterDuplicates([1, 2, 3], [3, 4, 5]);
 * console.log(result) // Output: [1, 2, 4, 5]
 * @internal
 */
export function filterDuplicates (array1: number[], array2: number[]): number[] {
    
    let set1 = new Set(array1);
    let set2 = new Set(array2);
    
    let uniqueArray1 = Array.from(set1).filter(item => !set2.has(item));
    let uniqueArray2 = Array.from(set2).filter(item => !set1.has(item));
    
    return [...uniqueArray1, ...uniqueArray2]
}

/**
 * Find the maximum value in an array.
 * 
 * @param { number[] } array - Array to find the maximum value.
 * @returns { number } - The maximum value in the array.
 * @example
 * const result = arrayMax([1, 2, 3]);
 * console.log(result) // Output: 3
 * @internal
 */
export function arrayMax (array: number[]): number {
    let max = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max
}