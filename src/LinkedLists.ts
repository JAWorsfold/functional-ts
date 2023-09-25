// ------------------------------
// Linked Lists
// ------------------------------

type List<A> = Nil | Cons<A>

interface Nil {
  readonly _tag: 'Nil'
}
interface Cons<A> {
  readonly _tag: 'Cons'
  readonly head: A
  readonly tail: List<A>
}

const nil: List<never> = { _tag: 'Nil' }
const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: 'Cons',
  head,
  tail,
})

const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === 'Nil'

// 1, 2, 3,
const myList = cons(1, cons(2, cons(3, nil)))
console.log(JSON.stringify(myList, null, 2))

type ShowList = <A>(xs: List<A>) => string
const showList: ShowList = <A>(xs: List<A>) =>
  isNil(xs)
    ? ''
    : `${xs.head}` + (isNil(xs.tail) ? '' : `, ${showList(xs.tail)}`)

console.log('Recursive showList(myList): ', showList(myList))

// tail recursive version
type ShowListTail = <A>(xs: List<A>, acc: string) => string
const showListTail: ShowListTail = <A>(xs: List<A>, acc: string) =>
  isNil(xs)
    ? acc
    : `${showListTail(
        xs.tail,
        acc + (isNil(xs.tail) ? `${xs.head}` : `${xs.head}, `)
      )}`
console.log(
  "Tail recursive showListTail(myList, ''): ",
  showListTail(myList, '')
)

type curryShowListTail = <A>(xs: List<A>) => (acc: string) => string
const curryShowListTail: curryShowListTail =
  <A>(xs: List<A>) =>
  (acc: string) =>
    isNil(xs)
      ? acc
      : `${showListTail(
          xs.tail,
          acc + (isNil(xs.tail) ? `${xs.head}` : `${xs.head}, `)
        )}`

console.log(
  "Curried tail recursive curryShowListTail(myList)(''): ",
  curryShowListTail(myList)('')
)
