import { compose, tostring } from "./shared";

// ------------------------------
// Recursion
// ------------------------------

function normal_sum_all(arr: number[]): number {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}
console.log(normal_sum_all([1, 2, 3, 4, 5]));

// if you know the base case and recursive case then you can define it

type SumAll = (arr: number[]) => number;
const sumAll: SumAll = (arr) =>
  arr.length === 0 ? 0 : arr[0] + sumAll(arr.slice(1));
console.log(sumAll([1, 2, 3, 4, 5]));

type SumAllToString = (xs: number[]) => string;
const sumAllToString: SumAllToString = compose(tostring, sumAll);
console.log(sumAllToString([1, 2, 3, 4, 5, 6]));

// ------------------------------
// Tail Recursion
// ------------------------------

type Factorial = (n: number) => number;
const factorialRecursive: Factorial = (n) =>
  n === 1 ? 1 : n * factorialRecursive(n - 1);
const factStart = performance.now();
// const factNum = 10000000; // maximum call stack size exceeded
const factNum = 150;
const factResult = factorialRecursive(factNum);
const factEnd = performance.now();
console.log(
  `factorialRecursive(${factNum}) = ${factResult} taking ${
    factEnd - factStart
  } ms`
);

interface FactGoValue {
  num: number;
  acc: number;
}
type FactGo = (o: FactGoValue) => number;

const factorialTailRecursive: FactGo = (o) => {
  if (o.num === 1) return o.acc;
  o.acc = o.acc * o.num;
  o.num = o.num - 1;
  return factorialTailRecursive(o);
};

const factTailStart = performance.now();
const factTailResult = factorialTailRecursive({ num: factNum, acc: 1 });
const factTailEnd = performance.now();
console.log(
  `factorialTailRecursive(${factNum}) = ${factTailResult} taking ${
    factTailEnd - factTailStart
  } ms`
);

type FactGo2 = (n: number, a: number) => number;
const factorialTailRecursive2: FactGo2 = (n, a) =>
  n === 1 ? a : factorialTailRecursive2(n - 1, a * n);
const factTailStart2 = performance.now();
const factTailResult2 = factorialTailRecursive2(factNum, 1);
const factTailEnd2 = performance.now();
console.log(
  `factorialTailRecursive2(${factNum}) = ${factTailResult2} taking ${
    factTailEnd2 - factTailStart2
  } ms`
);
