import { Option, some, isNone } from './shared'

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
const result = matchW(
  () => `num does not exist`,
  (a: number) => a
)(maybeNum)

console.log(result)

// Either

// List
