import { Increment, compose, increment, tostring } from './shared'

// ------------------------------
// Composition
// ------------------------------

// see shared.ts for increment definition
console.log(increment(3))

// see shared.ts for tostring definition
console.log(tostring(4))

type IncrementToString = (x: number) => string
const incrementToString: IncrementToString = (x) => tostring(increment(x))
console.log(incrementToString(5))

// see shared.ts for compose definition
const incrementToString2: IncrementToString = compose(tostring, increment)
console.log(incrementToString2(6))

// ------------------------------
// Currying
// ------------------------------

type Sum = (x: number, y: number) => number
const normalSum: Sum = (x, y) => x + y
console.log(normalSum(1, 2))

type CurrySum = (x: number) => (y: number) => number
const currySum: CurrySum = (x) => (y) => x + y
console.log(currySum(1)(2))

// powerful for passing function definitions or equality to new functions
const incrementSum: Increment = currySum(1)
console.log(incrementSum(10))

type Decrement = (x: number) => number
const decrement: Decrement = currySum(-1)
console.log(decrement(1))

// define a function to turn a function into a curry function
function normal_sum(a: number, b: number): number {
  return a + b
}
type CurryTwo = <A, B, Z>(f: (a: A, b: B) => Z) => (a: A) => (b: B) => Z
const curry2: CurryTwo = (f) => (a) => (b) => f(a, b)
const sum2 = curry2(normal_sum)
console.log(sum2(3)(4))

function normal_concat(a: string, b: string): string {
  return a + b
}
const concat2 = curry2(normal_concat)
console.log(concat2('hello')('world'))
