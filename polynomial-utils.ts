export function filterDuplicates (array1: number[], array2: number[]): number[] {
    
    let set1 = new Set(array1);
    let set2 = new Set(array2);
    
    let uniqueArray1 = Array.from(set1).filter(item => !set2.has(item));
    let uniqueArray2 = Array.from(set2).filter(item => !set1.has(item));
    
    return [...uniqueArray1, ...uniqueArray2]
}

export function arrayMax (array: number[]): number {
    let max = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max
}