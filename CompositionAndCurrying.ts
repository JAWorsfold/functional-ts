// ------------------------------
// Composition
// ------------------------------

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;
console.log(increment(3));

type Tostring = (x: number) => string;
const tostring: Tostring = (x) => `"${x}"`;
console.log(tostring(4));

type IncrementToString = (x: number) => string;
const incrementToString: IncrementToString = (x) => tostring(increment(x));
console.log(incrementToString(5));

// type Compose = (f: Tostring, g: Increment) => incrementToString
type Compose = <A, B, C>(
  f: (x: B) => C, // was f: (x: number) => string,
  g: (x: A) => B // was g: (x: number) => number
) => (x: A) => C; // was => (x: number) => string
const compose: Compose = (f, g) => (x) => f(g(x));
const incrementToString2: IncrementToString = compose(tostring, increment);
console.log(incrementToString2(6));

// ------------------------------
// Currying
// ------------------------------

type Sum = (x: number, y: number) => number;
const normalSum: Sum = (x, y) => x + y;
console.log(normalSum(1, 2));

type CurrySum = (x: number) => (y: number) => number;
const currySum: CurrySum = (x) => (y) => x + y;
console.log(currySum(1)(2));

// powerful for passing function definitions or equality to new functions
const incrementSum: Increment = currySum(1);
console.log(incrementSum(10));

type Decrement = (x: number) => number;
const decrement: Decrement = currySum(-1);
console.log(decrement(1));

// define a function to turn a function into a curry function
function normal_sum(a: number, b: number): number {
  return a + b;
}
type CurryTwo = <A, B, Z>(f: (a: A, b: B) => Z) => (a: A) => (b: B) => Z;
const curry2: CurryTwo = (f) => (a) => (b) => f(a, b);
const sum2 = curry2(normal_sum);
console.log(sum2(3)(4));

type StringConcat = (a: string, b: string) => string;
const stringConcat: StringConcat = (a, b) => a + b;

const curryString: CurryTwo = (f) => (a) => (b) => f(a, b);
function normal_concat(a: string, b: string): string {
  return a + b;
}
const concat2 = curry2(normal_concat);
console.log(concat2("hello")("world"));
