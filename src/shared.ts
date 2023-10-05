// type Compose = (f: Tostring, g: Increment) => incrementToString
type Compose = <A, B, C>(
  f: (x: B) => C, // was f: (x: number) => string,
  g: (x: A) => B // was g: (x: number) => number
) => (x: A) => C; // was => (x: number) => string
export const compose: Compose = (f, g) => (x) => f(g(x))

type Tostring = (x: number) => string
export const tostring: Tostring = (x) => `"${x}"`

export type Increment = (x: number) => number;
export const increment: Increment = (x) => x + 1

export type Option<A> = Some<A> | None
interface Some<A> {
  _tag: 'Some'
  value: A
}
interface None {
  _tag: 'None'
}

export const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x })
export const none: Option<never> = { _tag: 'None' }

// x is None is a Type Guard
export const isNone = <A>(x: Option<A>): x is None => x._tag === 'None'

export type Either<E, A> = Left<E> | Right<A>
interface Right<A> {
  _tag: 'Right'
  right: A
}
interface Left<E> {
  _tag: 'Left'
  left: E
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e,
})
export const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a,
})

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left'
// const isRight = <E, A>(x: Either<E, A>): x is Right<A> => x._tag === 'Right'

export type List<A> = Nil | Cons<A>

interface Nil {
  readonly _tag: 'Nil'
}
export interface Cons<A> {
  readonly _tag: 'Cons'
  readonly head: A
  readonly tail: List<A>
}

export const nil: List<never> = { _tag: 'Nil' }
export const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: 'Cons',
  head,
  tail,
})

export const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === 'Nil'

export type MatchL = <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: List<A>) => B
) => (xs: List<A>) => B
export const matchL: MatchL = (onNil, onCons) => (xs) =>
  isNil(xs) ? onNil() : onCons(xs.head, xs.tail)
