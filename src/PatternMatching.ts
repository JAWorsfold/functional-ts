import { Option, some, isNone, Either, isLeft, right, left } from './shared'

// ------------------------------
// ADT and Pattern Matching
// ------------------------------

// Option

// fp-ts is called matchW where 'W' stands for wide
// as it is widening our output type
type MatchW = <A, B, C>(
  onNone: () => B,
  onSome: (a: A) => C
) => (x: Option<A>) => B | C
const matchW: MatchW = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value)

const maybeNum: Option<number> = some(12)
const optionResult = matchW(
  () => `num does not exist`,
  (a: number) => a
)(maybeNum)

console.log(optionResult)

// Either

type MatchE = <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (x: Either<E, A>) => B
const matchE: MatchE = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right)

const errorOrNum1: Either<string, number> = right(33)
const rightResult = matchE(
  (e: string) => `Error happened: ${e}`,
  (a: number) => `num is ${a}`
)(errorOrNum1)
console.log(rightResult)

const errorOrNum2: Either<string, number> = left(`bad input`)
const leftResult = matchE(
  (e: string) => `Error happened: ${e}`,
  (a: number) => `num is ${a}`
)(errorOrNum2)
console.log(leftResult)

// List
