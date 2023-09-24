// type Compose = (f: Tostring, g: Increment) => incrementToString
type Compose = <A, B, C>(
  f: (x: B) => C, // was f: (x: number) => string,
  g: (x: A) => B // was g: (x: number) => number
) => (x: A) => C; // was => (x: number) => string
export const compose: Compose = (f, g) => (x) => f(g(x));

type Tostring = (x: number) => string;
export const tostring: Tostring = (x) => `"${x}"`;

export type Increment = (x: number) => number;
export const increment: Increment = (x) => x + 1;
