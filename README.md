# 🧮 polynomial-arithmetic [![NPM](https://img.shields.io/npm/v/polynomial-arithmetic.svg)](https://www.npmjs.com/package/polynomial-arithmetic)

```
# npm
> npm i polynomial-arithmetic
```

Library for performing polynomial arithmetic operations, designed in the context of polynomials in the Galois Field (GF). Test for primitiveness, irreducibility and setwise coprime taps, find the greatest common divisor polynomial besides multiplication, addition, subtraction, division and derivative.

Main use cases: Maximum length sequence (m-sequence) polynomial taps in Linear Feedback Shift Registers (LFSRs) (Cryptography, CRC, Digital Signal Processing, Testing and Benchmarking). Test primtive, irreducible, setwise coprime, use: extended euclidean algorithm for polynomials.

## Arithmetic Methods

```typescript
let result;
const polynomial = new Polynomial('x^4 - 2x^2 + 96')

// Division
result = polynomial.divide("x^2 + 1")
console.log(result.quotient.polynomialString) // x^2 - 3
console.log(result.remainder.polynomialString) // 99

// Addition
result = result.quotient.add("4x^2 + 1")
console.log(result.polynomialString) // 5x^2 - 2

// Multiplication
result = result.multiply("x^2 + 1")
console.log(result.polynomialString) // 5x^4 + 3x^2 - 2

// Subtraction
result = result.sub("x^4 - x^2 - 2")
console.log(result.polynomialString) // 4x^4 + 4x^2

// Greatest Common Divisor
result = result.gcd("x^2 + 1")
console.log(result.polynomialString) // x^2 + 1

// Derivative
result = result.derivative()
console.log(result.polynomialString) // 2x
```
###
Long division of polynomials, enables computing modular arithmetic of a polynomial f(x) with a polynomial g(x) as modulus by dividing f(x) into g(x) and keeping the remainder. Furthermore if p(x) divides f(x) then the greatest common divisor is p(x) itself.

This long division method is optimized by computing the modulus (number) of intermediate results otherwise computed at the end, thus preventing the storage of large integer elements in the polynomial array, which may lead to incorrect results due to precision loss or NaN values.

## Finite Fields - Galois Field (GF) Methods
```typescript
let result;
const polynomial = new FieldPolynomial('x^4 - x^2 + 1')

// Division
result = polynomial.divideGF("x^2 + 1")
console.log(result.quotient.polynomialString) // x^2
console.log(result.remainder.polynomialString) // 1

// XOR Addition
result = result.quotient.addGF("x^3 + x^2 + 1")
console.log(result.polynomialString) // x^3 + 1

// AND Multiplication
result = result.multiplyGF("x^2 + 1")
console.log(result.polynomialString) // x^5 + x^3 + x^2 + 1

// XOR Subtraction
result = result.subGF("x^2 + 1")
console.log(result.polynomialString) // x^5 + x^3
```

Bitwise optimized methods for polynomial arithmetic in GF(2) where coefficients are either 0 or 1, example: x^10 + x.Enabling efficient computation. Multiplication, bitwise AND, bit [Carry-Less Product](https://en.wikipedia.org/wiki/Carry-less_product) method. Subtraction & Addition both share the same method & result. XOR (bit exclusive OR) operation.

### Bitwise Division

Long Division, Improved. Assuming polynomial in GF(2) thus working modulo 2 and removing the need of working with long arrays of coefficients. Instead working with short arrays of unique exponents, however, despite short lengths, elements in the array may reach large integers. Loops require less computation.

note: 2^53 - 1 highest integer before loosing precision

### Irreducibility:
```typescript
const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1')
console.log(polynomial.isIrreducible()) // true
```

An [Irreducible  polynomial](https://en.m.wikipedia.org/wiki/Irreducible_polynomial#Over_the_integers_and_finite_fields) over a given [finite field (GF)](https://en.m.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields) (or domain) is a non-constant polynomial that cannot be factored into the product of two non-constant polynomials with coefficients in the same domain. [Rabin's test](https://math.stackexchange.com/questions/1343450/how-can-i-prove-irreducibility-of-polynomial-over-a-finite-field) of irreducibility, states ([Fresham's Law of Exponents](https://math.stackexchange.com/a/530497)), n be the maximum possible period in F(p<sup>n</sup>), which is the size of the field, such that:
-  **x<sup>p^n</sup> - x** divides f(x) mod (p)
- GCD(f(x),**x<sup>p^(n/q)</sup> - x**) mod(2) = 1 for each prime divisor q of n - then f(x) is guaranteed to be irreducible over F(p<sup>n</sup>).

By testing only some prime divisors q of n we can make the test probabilistic and reduce computation. If GCD results in 0, this indicates that f(x) shares a non-trivial factor with g(x), which means f(x) is not irreducible over F(p<sup>n</sup>).

Otherwise, brute force every possible divisor in F(2<sup>n</sup>), if none divide, then f(x) is irreducible over F(2<sup>n</sup>). **p = x^(2^i)**, for every i from 1 to degree/2 mod p(x) congruent to x & **p2 = p^(2^degree) mod p(x) congruent to x**. Other method: Berlekamp's Algorithm

### Primitiveness:
```typescript
const polynomial = new FieldPolynomial('x^7 + x^6 + 1')
console.log(polynomial.isPrimitive()) // true
```

A [primitive polynomial (field theory)](https://en.m.wikipedia.org/wiki/Primitive_polynomial_(field_theory)#:~:text=An%20irreducible%20polynomial%20F(x,n%20%3D%20pm%20%E2%88%92%201.)) is **monic**, **irreducible**  and has a **[root](https://en.m.wikipedia.org/wiki/Root_of_unity#primitive) α that cyclically  generates the entire field** with α<sup>e</sup> = 1 thus having order e, it must **have a non-zero constant term**, for otherwise it will be divisible by x. Over GF(2), x + 1 is a primitive polynomial and all other primitive polynomials have an **odd number of terms**, since any polynomial mod 2 with an even number of terms is divisible by x + 1 (it has 1 as a root).

For a polynomial f(x) of degree m over GF(p) (where p is prime) to be primtive, the order which is the smallest positive integer e such that f(x) divides x<sup>e</sup> − 1 (e = p<sup>n</sup> − 1), must satisfy:

- **x<sup>e</sup> ≡ 1 mod(f(x))** where e = 2<sup>n</sup> - 1 in GF(2)
- **x<sup>d</sup> mod f(x)** for each divisor d of (2^n - 1) - If some returns 1, f(x) is not primitive over GF(2<sup>n</sup>)

##### Other sources: [Primitive Test](https://math.stackexchange.com/questions/312186/understanding-primitive-polynomials-in-gf2), [Primitive Roots](https://math.stackexchange.com/questions/76045/reed-solomon-polynomial-generator/76136#76136), [Cyclotomic Polynomial](https://en.m.wikipedia.org/wiki/Cyclotomic_polynomial), [Primitive Element Test](https://math.stackexchange.com/questions/1740490/finite-fields-efficient-primitive-element-test)

## Feedback Polynomials [![JSON](https://img.shields.io/badge/Feedback_Polynomials-JSON-blue)](https://gist.github.com/JimGitFE/6fa73d23cdbbd8d41c45d55f9f1527ac)

Array of maximum sequence Linear Feedback Shift Registers (LFSRs) irreducible & primitive polynomials with setwise coprime taps. Following property names and their meaning:

- Degree: highest power of the variable 𝑥 with a non-zero coefficient in the array of polynomials
- Max: represents the maximum number of feedback polynomials to generate before stopping
- Possible: number of available polynomial tap combinations
- Generated: number of polynomial tap combinations with uneven terms
- Tested: number of polynomials that went through the test
- Found: number of polynomials that passed the test

[<sup>see file</sup>](https://gist.github.com/JimGitFE/6fa73d23cdbbd8d41c45d55f9f1527ac)

# Contributions

This project encourages contributions and suggestions.