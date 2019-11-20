#!/usr/bin/env node

// ---------------------------------------------------------------
// Exercise 1

function exercise1(list) {
  var sum = 0
  for (e of list) {
    sum += (e + 1)
  }
  return sum
}

console.log(exercise1([1, 3, 5, 6, 7]))
console.log(exercise1([9, 9, 9, 4]))

// ---------------------------------------------------------------
// Exercise 2

function exercise2(list) {
  const increment = x => x + 1
  const add = (x, y) => x + y
  return list.map(increment).reduce(add, 0)
}

console.log(exercise2([1, 3, 5, 6, 7]))
console.log(exercise2([9, 9, 9, 4]))

// ---------------------------------------------------------------
// Exercise 4

function exercise4(list) {
  if (list.length == 0) {
    return 0
  } else {
    return (list[0] + 1) + exercise4(list.slice(1))
  }
}

console.log(exercise4([1, 3, 5, 6, 7]))
console.log(exercise4([9, 9, 9, 4]))

// ---------------------------------------------------------------
// Exercise 4 using ternary operator

function exercise4_2(list) {
  (list.length == 0) ? 0 : ((list[0] + 1) + exercise4_2(list.slice(1)))
}

console.log(exercise4_2([1, 3, 5, 6, 7]))
console.log(exercise4_2([9, 9, 9, 4]))

// ---------------------------------------------------------------
// Exercise 4 by redefining map and reduce

function exercise4_3(list) {
  const head      = xs => xs[0]
  const tail      = xs => xs.slice(1)
  const increment = x => x + 1
  const add       = (x, y) => x + y

  const map = (f, xs) => {
    if (xs.length == 0) {
      return []
    } else {
      return [f(head(xs))].concat(map(f, tail(xs)))
    }
  }

  const reduce = (f, initial, xs) => {
    if (xs.length == 0) {
      return initial
    } else {
      return reduce(f, f(initial, head(xs)), tail(xs))
    }
  }

  return reduce(add, 0, map(increment, list))
}

console.log(exercise4_3([1, 3, 5, 6, 7]))
console.log(exercise4_3([9, 9, 9, 4]))
