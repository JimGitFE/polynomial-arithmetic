export const compareArrays = (a: any[], b: any[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

export function isPrime(num: number) {
    for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if(num % i === 0) return false; 
    return num > 1;
}

// Modulo Operation
export const mod = function (num: number, modulo: number):number {
    if (modulo === 0) return num
    return ((num % modulo) + modulo) % modulo;
  };

// power (a ⋅ b) mod m = [(a mod m) ⋅ (b mod m)] mod m
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