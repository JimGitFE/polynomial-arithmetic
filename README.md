# Polynomial Constructor

```typescript
new Polynomial('x^4 -2x^2 + 96')
```

# Finite Fields GF(2)
```typescript
new FieldPolynomial('x^4 - x^2 + 1')
```

For Polynomials in the galois field, coefficients (0 & 1) GF(2)

## Primitiveness:

```typescript
new FieldPolynomial('x^7 + x^6 + 1').isPrimitive() // true
```

A primitive polynomial is **monic** and has a **root that generates the entire field** in a cyclic matter with α<sup>e</sup> = 1 thus having order e, it must **have a non-zero constant term**, for otherwise it will be divisible by x. Over GF(2), x + 1 is a primitive polynomial and all other primitive polynomials have an **odd number of terms**, since any polynomial mod 2 with an even number of terms is divisible by x + 1 (it has 1 as a root).

An **irreducible** polynomial f(x) of degree m over GF(p), where p is prime, is a primitive polynomial where the order is the smallest positive integer e such that F(x) divides x<sup>e</sup> − 1 where e = p<sup>n</sup> − 1. That is:

**x<sup>e</sup> ≡ 1 mod(f(x))** where e = 2<sup>n</sup> - 1

And for every divisor (d) of (2^n - 1), compute x<sup>d</sup> mod f(x). If the result is equal to 1 for any d, then f(x) is not a primitive polynomial. 

##### Other sources: [Root in GF(2<sup>n</sup>)](https://en.m.wikipedia.org/wiki/Root_of_unity#primitive), copilot, [Primitive polynomial (field theory)](https://en.m.wikipedia.org/wiki/Primitive_polynomial_(field_theory)#:~:text=An%20irreducible%20polynomial%20F(x,n%20%3D%20pm%20%E2%88%92%201.)), [Primitive Test](https://math.stackexchange.com/questions/312186/understanding-primitive-polynomials-in-gf2), [Primitive Roots](https://math.stackexchange.com/questions/76045/reed-solomon-polynomial-generator/76136#76136), [https://en.m.wikipedia.org/wiki/Cyclotomic_polynomial](https://en.m.wikipedia.org/wiki/Cyclotomic_polynomial), [Primitive Element Test](https://math.stackexchange.com/questions/1740490/finite-fields-efficient-primitive-element-test)

## Irreducibility:

```typescript
new FieldPolynomial('x^4 + x^3 + x^2 + x + 1').isIrreducible() // true
```

An [Irreducible  polynomial](https://en.m.wikipedia.org/wiki/Irreducible_polynomial#Over_the_integers_and_finite_fields) is one that cannot be factored into polynomials with coefficients in the same domain that both have a positive degree.

[Rabin's test](https://math.stackexchange.com/questions/1343450/how-can-i-prove-irreducibility-of-polynomial-over-a-finite-field) of irreducibility, states, m be the maximum possible period, which is the size of the field, such that **x<sup>p^n</sup> - x divides f(x) mod (p)**
and **GCD(f(x),x<sup>p^(n/q)</sup> - x) mod(2) = 1** for each prime divisor q of n, then f(x) is irreducible over GF(p^n).


Otherwise, check every possible divisor in GF(2<sup>n</sup>), if none divide, then f(x) is irreducible over GF(2<sup>n</sup>)
1. p = x^(2^i), *for every i from 1 to degree/2 mod p(x) congruent to x
2. p2 = p^(2^degree) mod p(x) congruent to x

Other methods: Berlekamp's Algorithm
##### Ohter sources: [Finite fields (GF)](https://en.m.wikipedia.org/wiki/Factorization_of_polynomials_over_finite_fields),  copilot, [Rabins High Exponents Fresham's Law](https://math.stackexchange.com/a/530497)

## Bitwise Division
```typescript
new FieldPolynomial('x^4 + x^3 + x^2 + x + 1').divideGF("x^4 + x^3") // res
```

Long Division, Improved. Assuming polynomial in the GF thus working modulo 2 and removing the need of working with an extremely long coefficients array, short array of unique exponents instead (non-repeated since coefficients 1 or 0). Loops require less computation.

## Bitwise Arithemtic

```typescript
const polynomial = new FieldPolynomial('x^4 + x^3 + x^2 + x + 1')

polynomial.multiplyGF("x + 2")
polynomial.addGF("x + 2")
polynomial.subGF("x + 2")
```

Multiplication: Bit Carry Less Product Metho

Subtraction & Addition: Bit exclusive or

##### Sources: [Carry-Less Product](https://en.wikipedia.org/wiki/Carry-less_product)

## GCD

if p divides f then the greatest common divisor is the monic polynomial 1