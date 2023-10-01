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
export interface Some<A> {
  _tag: 'Some'
  value: A
}
export interface None {
  _tag: 'None'
}

export const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x })
export const none: Option<never> = { _tag: 'None' }

// x is None is a Type Guard
export const isNone = <A>(x: Option<A>): x is None => x._tag === 'None'
