import { compose, increment } from './shared'

// ------------------------------
// Either: Right, Left
// ------------------------------

// without Either - partial function
function divideTwoIfEven(num: number): number {
  if (num === 0) {
    throw 'cannot divide by zero'
  } else if (num % 2 !== 0) {
    throw 'num is not even'
  } else {
    return 2 / num
  }
}

console.log(divideTwoIfEven(8))
// console.log(divideTwoIfEven(3))

// Using Option and None will lose the Error message
// so we use Either instead

type Either<E, A> = Left<E> | Right<A>
interface Right<A> {
  _tag: 'Right'
  right: A
}
interface Left<E> {
  _tag: 'Left'
  left: E
}

const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e,
})
const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a,
})

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left'
// const isRight = <E, A>(x: Either<E, A>): x is Right<A> => x._tag === 'Right'

function divideTwoIfEven2(num: number): Either<string, number> {
  if (num === 0) {
    return left('cannot divide by zero')
  } else if (num % 2 !== 0) {
    return left('num is not even')
  } else {
    return right(2 / num)
  }
}

console.log(divideTwoIfEven2(8))
console.log(divideTwoIfEven2(3))
console.log(divideTwoIfEven2(0))

type Composed = (num: number) => Either<string, number>
const composed: Composed = compose(
  (x) => (isLeft(x) ? x : right(increment(x.right))),
  divideTwoIfEven2
)

console.log(composed(8))
console.log(composed(3))
console.log(composed(0))
console.log(composed(2))
