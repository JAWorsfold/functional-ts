import { compose, increment } from './shared'

// ------------------------------
// Option, Some, None
// ------------------------------

type DivideTwo = (x: number) => number
const divideTwo: DivideTwo = (x) => 2 / x
console.log(divideTwo(8))
console.log(divideTwo(0))

type DivideTwoThenIncrement = (x: number) => number
const divideTwoThenIncrement: DivideTwoThenIncrement = compose(
  increment,
  divideTwo
)
console.log(divideTwoThenIncrement(8))
console.log(divideTwoThenIncrement(0))

type Option<A> = Some<A> | None
interface Some<A> {
  _tag: 'Some'
  value: A
}
interface None {
  _tag: 'None'
}

const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x })
const none: Option<never> = { _tag: 'None' }

// x is None is a Type Guard
const isNone = <A>(x: Option<A>): x is None => x._tag === 'None'
type DivideTwo2 = (x: number) => Option<number>
const divideTwo2: DivideTwo2 = (x) => (x === 0 ? none : some(2 / x))

const divideTwoThenIncrement2 = compose(
  (x: Option<number>) => (isNone(x) ? none : some(increment(x.value))),
  divideTwo2
)
console.log(divideTwoThenIncrement2(8))
console.log(divideTwoThenIncrement2(0))
