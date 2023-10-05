import { List, cons, nil, matchL } from './shared'
// ------------------------------
// Magma, Semigroup, Monoid
// ------------------------------
// Composing functions with matching types

// Magma (map two items in a set to same set)

type AddAll = (xs: List<number>) => number
const addAll: AddAll = (xs) =>
  matchL(
    () => 0,
    (head: number, tail: List<number>) => head + addAll(tail)
  )(xs)
console.log(addAll(cons(2, cons(3, cons(4, nil)))))

// Point free form or style
// function is defined without mentioning one or more of it's parameters
// so the above can be:
const addAllPointFree: AddAll = matchL(
  () => 0,
  (head: number, tail: List<number>) => head + addAll(tail)
)
console.log(addAllPointFree(cons(2, cons(3, cons(4, nil)))))

type MultiplyAll = (xs: List<number>) => number
const multiplyAll: MultiplyAll = matchL(
  () => 1,
  (head: number, tail: List<number>) => head * multiplyAll(tail)
)
console.log(multiplyAll(cons(2, cons(2, cons(4, nil)))))

type AppendAll = (xs: List<string>) => string
const appendAll: AppendAll = matchL(
  () => '',
  (head: string, tail: List<string>) => head + appendAll(tail)
)
console.log(appendAll(cons('hello', cons(' ', cons('world', nil)))))

// how do we abstract the differences from the above?? Use Magma

interface Magma<A> {
  concat: (x: A, y: A) => A
}

// Semigroup (can't define associativity in TS/JS)

interface Semigroup<A> extends Magma<A> {}

const addSemigroup: Semigroup<number> = { concat: (x, y) => x + y }
const multiplySemigroup: Semigroup<number> = { concat: (x, y) => x * y }
const appendSemigroup: Semigroup<string> = { concat: (x, y) => x.concat(y) }

const concatAll =
  <A>(s: Semigroup<A>) =>
  (startWith: A) =>
  (xs: List<A>): A =>
    matchL(
      () => startWith,
      (head: A, tail: List<A>) => s.concat(head, concatAll(s)(startWith)(tail))
    )(xs)

console.log(concatAll(addSemigroup)(0)(cons(2, cons(3, cons(4, nil)))))
console.log(concatAll(multiplySemigroup)(1)(cons(2, cons(2, cons(4, nil)))))
console.log(
  concatAll(appendSemigroup)('')(cons('hello', cons(' ', cons('world', nil))))
)

// Monoid (the above has to pass the initial value)
// (but if it's always the same we can use monoid)

interface Monoid<A> extends Semigroup<A> {
  empty: A
}

const addMonoid: Monoid<number> = { ...addSemigroup, empty: 0 }
const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, empty: 1 }
const appendMonoid: Monoid<string> = { ...appendSemigroup, empty: '' }

// converted this to point free style by first defining the function type
type ConcatAllMonoid = <A>(m: Monoid<A>) => (xs: List<A>) => A
const concatAllMonoid: ConcatAllMonoid = <A>(m: Monoid<A>) =>
  matchL(
    () => m.empty,
    (head: A, tail: List<A>) => m.concat(head, concatAllMonoid(m)(tail))
  )

console.log(concatAllMonoid(addMonoid)(cons(2, cons(3, cons(4, nil)))))
console.log(concatAllMonoid(multiplyMonoid)(cons(2, cons(2, cons(4, nil)))))
console.log(
  concatAllMonoid(appendMonoid)(cons('hello', cons(' ', cons('world', nil))))
)
