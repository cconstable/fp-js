#!/usr/bin/env node

// ---------------------------------------------------------------
// recursive fold implementations

// foldl implementation 
function foldl(f, initial, list) {
    if (list === undefined || list.length == 0) {
        return initial
    } else {
        return foldl(f, f(initial, list[0]), list.slice(1))
    }
}

// foldr implementation 
function foldr(f, initial, list) {
    if (list === undefined || list.length == 0) {
        return initial
    } else {
        return f(list[0], foldr(f, initial, list.slice(1)))
    }
}

const list = [12, 30, 21]
const initial = 52
const f = (acc, x) => acc - x

console.log("\n---------------------------------------------------------------")
console.log("-- foldl and foldr")
console.log("---------------------------------------------------------------")

console.log(
    "reduce: " + list.reduce(f, initial) // -11
)

console.log(
    "foldl: " + foldl(f, initial, list) // -11
)

console.log(
    "foldr: " + foldr(f, initial, list) // -49
)

// ---------------------------------------------------------------
// Challenge 1
//
// The universality of fold: Using only `reduce` implementn `map` 
// and `filter`.
console.log("\n---------------------------------------------------------------")
console.log("-- Challenge 1")
console.log("---------------------------------------------------------------")

function map(f, list) {
    return list.reduce((acc, x) => acc.concat([f(x)]), [])
}

console.log(
    "map using reduce (empty):\t" + JSON.stringify(map(x => x * 2, []))
)

console.log(
    "map using reduce (one elem):\t" + JSON.stringify(map(x => x * 2, [1]))
)

console.log(
    "map using reduce (many elem):\t" + JSON.stringify(map(x => x * 2, [1, 2, 3]))
)

function filter(pred, list) {
    return list.reduce((acc, x) => pred(x) ? acc.concat([x]) : acc, [])
}

function isEven(x) { return x % 2 == 0 }

console.log(
    "filter using reduce (empty):\t" + JSON.stringify(filter(isEven, []))
)

console.log(
    "filter using reduce (one elem):\t" + JSON.stringify(filter(isEven, [2]))
)

console.log(
    "filter using reduce (many elem):" + JSON.stringify(filter(isEven, [1, 2, 3, 4]))
)

// ---------------------------------------------------------------
// Challenge 2
//
// The universality of fold: Using only `reduce` implementn `map` 
// and `filter`.
console.log("\n---------------------------------------------------------------")
console.log("-- Challenge 1")
console.log("---------------------------------------------------------------")

// ---------------------------------------------------------------
// Problems with Javascript's reduceRight

// Javascript's build-in foldr (reduceRight) incorrectly (IMO) swaps the
// parameters of f in the implementation causing surprising results.
// 
// Instead of:
//     return f(list[0], foldr(f, initial, list.slice(1)))
//
// the implementation seems to be written as:
//      return f(foldr(f, initial, list.slice(1)), list[0])
//
// These are equivalent for semigroups (things that have an associative
// binary operator) but produce different results for everything else.

// Compare the output of this "foldr" to the foldr written above
console.log(
    "reduceRight: " + list.reduceRight(f, initial)   // -11
)

// We can use the 3rd duality theorem (Bird and Walder 1988) to show
// Javascript's reduceRight is incorrect. The theorem states that 
// foldr(f, initial, list) == foldl(g, initial, list.reverse()) where
// "g" is equal to "f" except the parameters are in reverse order.

const listR = list.reverse()
const g = (x, acc) => acc - x

const jsObeysTheorem = list.reduce(f, initial) == listR.reduceRight(g, initial)
const weObeyTheorem = list.reduce(f, initial) == foldr(g, initial, listR)

console.log("js obeys 3rd duality theorem: " + jsObeysTheorem)
console.log("custom foldr obeys 3rd duality theorem: " + weObeyTheorem)

// ---------------------------------------------------------------
// Exercise 1

// foldl using foldr
function foldl2(f, initial, list) {
    return foldr(
        (y, g) => x => f(g(x), y),
        (x => x),
        list
    )(initial)
}

console.log(
    "reduce: " + list.reduce(f, initial)
)

console.log(
    "foldl: " + foldl2(f, initial, list)
)
