class: center, middle

<div style="color:#F78C6A">
# Functional Programming
</div>
Chris Constable

???

Hey everyone. I'm Chris Constable. I was introduced to functional programming in university. It took me years to connect the dots and really grasp a lot of the ideas. My hope with this workshop is to drastically shorten that time for you.

There are coding exercises interspersed through the talk so having a way to write and run JS quickly will help.

---
class: center, middle, important-slide

## *"Why write a function to solve a problem, when you can write a function which returns a function to solve that problem?"*

???

This is a silly saying... but it's really not that silly. We'll see why.

---
class: center, middle, important-slide

## *"The functional programmer sounds rather like a medieval monk, denying themselves the pleasures of life in the hope that it will make them virtuous." - John Hughes*

???

That's fair. Most introductions to functional programming say something like: "It's like regular programming but you can't use variables or modify state."

---

# The problem of complexity

???

So to begin we need to talk about why functional programming matters.

--

- Software is complex because life is complex
--

- How do we deal with complexity?

---
class: center, middle, important-slide

## *We break big problems into smaller ones*

---

class: center, middle

![:scale 80%](img/vcr.jpg)

???

As a child (this is not me) I wanted to know how the electronics worked in my house. I had this intuition that if I could just break the VCR into it's smallest, atomic components then I would be able to understand how it worked.

Unfortunately, I was never able to put the electronics back together.

---

# The problem of complexity

- We are taught to decompose problems into smaller, easier ones
--

- This is great, *but it's only half the story*.

---

class: center, middle, important-slide

## *How we put solutions together is just as important as how we break problems down*

???

We have lots of tools for breaking problems down but when was the last time you remember being reading something that was about putting solutions together?

---

# Functional Programming

- Functional programming (FP) is a programming style that helps us <span class="important-text">*break problems down*</span> and <span class="important-text">*compose solutions together*</span>.
--

- FP provides powerful mechanisms for <span class="important-text">*controlling complexity*</span>.
--

- FP <span class="important-text">*gives us tools*</span> to create <span class="important-text">*modular*</span> and <span class="important-text">*composable*</span> code.

???

This is critical to understanding functional programming.

---

# Modules

???

When you hear the word "module" in the context of software, what comes to mind? How would you define a "module" to someone?

--

- "something that can be reused"
- "something self-contained"
- "isolated"
- "does one general thing"
- "consistently works"
- "black box"

???

Do these things all look familiar?

---

class: center, middle, important-slide

## *module == function*

???

In FP, modules are just functions.

---

# Modularity
--

- Modules are just functions
--

- These functions have properties:
  - *Deterministic*: Given the same input we get the same output ("mathematical functions")
  - *No free variables*: Functions don't depend on external constants, system calls, or their environment
  - *No "side-effects"*: Executing one function should not change how another function executes
--

- Functions that have all these properties are called *pure functions*.

---

<div style="color:#6C7BD0">
# > Exercise 1
</div>
Write a *pure function* that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

```js
f([1])        == sum of [2]           == 2
f([1, 2])     == sum of [2, 3]        == 5
f([9, 9, 9])  == sum of [10, 10, 10]  == 30
```

???

Let's write a module.
---

<div style="color:#6C7BD0">
# > Exercise 1 Solution
</div>
```js
function exercise1(list) {
  var sum = 0
  for (e of list) {
    sum += (e + 1)
  }
  return sum
}
```

---

<div style="color:#6C7BD0">
# > Exercise 2
</div>
Write a *pure function* that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

- Do not use using any loop constructs e.g `for`, `while`, etc

---
class: center, middle

# 🤔

???

If you are feeling stumped by this it's OK! We'll come back to the solution after looking at some FP tools.

---

# Composition

To solve the previous exercise we need to introduce some "glue" we can use to compose modules.

---

# Composition

`map`
--


Think of `map` as something that *transforms* all the elements of some *container-y* structure by using a given function and returns a new structure.
--

```js
[1, 2, 3].map(x => x + 1) == [2, 3, 4]
[1, 2, 3].map(x => x * x) == [1, 4, 9]
[1, 2, 3].map(x => x)     == [1, 2, 3]
[1, 2, 3].map(x => 5)     == [5, 5, 5]
```

---

# Composition

Pitfall: Don't mistake `map` as something unique to arrays or hashmaps or "lists". It is a generic idea!

---

# Composition

`fold`
--


`fold` is a function that takes a *traversable data structure* (like an array), *a function for combining* two elements of that data structure, and *an initial value*, and returns the result of "folding" all the elements into each other until only one element is left.

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, `0`, [1, 2, 3])  // == 6
```

```js
0
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(`add`, 0, [`1`, 2, 3])  // == 6
```

```js
`0`
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
add(0, 1)
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
1
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(`add`, 0, [1, `2`, 3])  // == 6
```

```js
`1`
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
add(1, 2)
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
3
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(`add`, 0, [1, 2, `3`])  // == 6
```

```js
`3`
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
add(3, 3)
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 0, [1, 2, 3])  // == 6
```

```js
6
```

---

# fold

```js
const add = (x, y) => { return x + y }
fold(add, 100, [1, 4, 10])  // == 115
```

---

# Composition

`fold` is sometimes called `reduce`, `accumulate`, `aggregate`, `compress`, or `inject`

---

# Composition

Fold in Javascript

```js
const add = (x, y) => { return x + y }
[1, 2, 3].reduce(add, 0)  // == 6
[1, 4, 10].reduce(add, 0) // == 15
```

---

# Fold can do many things

```js
const sum           = fold(+, 0)      
const product       = fold(*, 1)      
const concatList    = fold(+, [])     
const concatString  = fold(+, "")     
const allAreTrue    = fold(&&, true)  
const anyIsTrue     = fold(||, false)
```

---

<div style="color:#6C7BD0">
# > Exercise 2
</div>
Write a program that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

- Do not use using any loop constructs e.g `for`, `while`, etc

---

<div style="color:#6C7BD0">
# > Exercise 2 Solution
</div>
```js
function exercise2(list) {
  const increment = x => x + 1
  const add = (x, y) => x + y
  return list.map(increment).reduce(add, 0)
}
```

---

<div style="color:#6C7BD0">
# > Exercise 2 Solution
</div>
```js
function exercise2(list) {
  const increment = x => x + 1
  const add = (x, y) => x + y
* return list.map(increment).reduce(add, 0)
}
```

Notice the last line is just function calls: `map`, `increment`, `reduce`, and `add`.

---

<div style="color:#6C7BD0">
# > Exercise 2 Solution
</div>
```js
function exercise2(list) {
  const `increment` = x => x + 1
  const `add` = (x, y) => x + y
  return list.map(`increment`).reduce(`add`, 0)
}
```

We were *guided* to create functions for handling the individual, smaller problems: incrementing and adding.

---

<div style="color:#6C7BD0">
# > Exercise 2 Solution
</div>
```js
function exercise2(list) {
  const increment = x => x + 1
  const add = (x, y) => x + y
  return list.`map`(increment).`reduce`(add, 0)
}
```

Finally, we use some FP *"glue"* to *compose* the solutions together: `map` and `reduce`.

---

<div style="color:#6C7BD0">
# > Exercise 2 Solution
</div>
```js
function exercise2(list) {
  const increment = x => x + 1
  const add = (x, y) => x + y
  return list.`map`(increment).reduce(add, 0)
}
```

Reminder: `map` and `reduce` do not mutate the original array! They produce new arrays.

---

class: center, middle, important-slide

## *We defined solutions with small pure functions and glued (composed) them together*

---

# Recap: Modularity
--

- Functions are building blocks and are treated like variables
--

- Functions can take other functions as input and return other functions as output
  - These are called *higher-order functions*
--

- Functions are *pure*
  - They only act on their inputs
  - They are *referentially transparent*
--

- Operations have *no side-effects*
  - Modifying "state" outside of a local environment
  - e.g. Setting a value in a globally cache
--

- Perceived *immutability* of state
  - Constant "variables" only

---

# Recap: Composition
--

- `map` transforms the element(s) of a structure
- `fold` (`reduce`) sequentially "folds" a traversable structure down into a new value

---

<div style="color:#6C7BD0">
# > Exercise 3
</div>
The execution order of a purely functional program is irrelevant. Why?

???

[...] Stop and let this sink in. What are the implications of this? Spoiler: A functional language gives you parallelism for free and completely eliminates many type of bugs related to concurrent programming (n.b. parallelism and concurrency are different things). As to why, I will leave this as an exercise.

---

# Monoids

> *"A monoid is a set that is closed under an associative binary operation and has an identity element I in S such that for all a in S, Ia=aI=a."*

???

LETS ABOUT MONOIDS! You already know what these are but let's read the formal definition.

---

# Monoids

A monoid is something we can `reduce`.
--


Let's take the set of integers: `[0, 1, 2..]`

```js
2 + 0 = 2
```

---

# Monoids

A monoid is something we can `reduce`.

`+` is our associative binary operator

```js
2 `+` 0 = 2
```

---

# Monoids

A monoid is something we can `reduce`.

`0` is our identity element

```js
2 + `0` = 2
```

---
# Monoids

```js
fold(+, 0)      // integers and addition
fold(*, 1)      // integers and multiplication
fold(+, [])     // arrays and concatenation
fold(+, "")     // strings and concatenation
fold(&&, true)  // booleans and logical AND
fold(||, false) // booleans and logical OR
```

???

Remember our list from before? All these things form monoids.

---

<div style="color:#6C7BD0">
# > Exercise 4
</div>
Write a *pure function* that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

- Do not use using any loop constructs e.g `for`, `while`, etc
- Do not use `map` or `reduce`
- Do not use any built-in Javascript functions

---
class: center, middle

# 🤔

---

# Recursion
--


Recursion is a way to "loop" over things
--

```js
function loop(list) {
  if (list.length == 0) { return }
  console.log("loop")
  loop(list.slice(1))
}
```

---

# Recursion

Recursion is when a function directly or indirectly calls itself. It can be used as a way to "loop" over things

```js
function loop(list) {
* if (list.length == 0) { return }
  console.log("loop")
  loop(list.slice(1))
}
```

---

# Recursion

Recursion is when a function directly or indirectly calls itself. It can be used as a way to "loop" over things

```js
function loop(list) {
  if (list.length == 0) { return }
  console.log("loop")
* loop(list.slice(1))
}
```

---

# Recursion

```js
loop([1,2,3])
  console.log
  loop()
```

---

# Recursion

```js
loop([1,2,3])
  console.log
* loop([2, 3])
*   console.log
*   loop()
```

---

# Recursion

```js
loop([1,2,3])
  console.log
  loop([2, 3])
    console.log
*   loop([3])
*     console.log
*     loop()
```

---

# Recursion

```js
loop([1,2,3])
  console.log
  loop([2, 3])
    console.log
    loop([3])
      console.log
*     loop([])
*       return
```

---

<div style="color:#6C7BD0">
# > Exercise 4
</div>
Write a *pure function* that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

- Do not use using any loop constructs e.g `for`, `while`, etc
- Do not use `map` or `reduce`
- Do not use any built-in Javascript functions

---

<div style="color:#6C7BD0">
# > Exercise 4 Solution
</div>
```js
function exercise4(list) {
  if (list.length == 0) {
    return 0
  } else {
    return (list[0] + 1) + exercise4(list.slice(1))
  }
}
```

---

<div style="color:#6C7BD0">
# > Exercise 5
</div>
Write a program that takes a list of numbers, adds one to each number, and then returns the sum of the incremented numbers.

- Do not use using any loop constructs e.g `for`, `while`, etc
- Do not use `map` or `reduce`
- Do not use any built-in Javascript functions
--

- Do not use the `+` operator
--

- Do not use numbers
--

- Do not use strings
--

- or built-in primitives or data structures

---

# Peano Numbers
--

```haskell
data Number = Zero | Succ Number
```
--

```haskell
zero  = Zero
one   = Succ zero
two   = Succ Succ zero
three = Succ Succ Succ zero
```

---

# Lambda Calculus
--

In the 1930s, Alonzo Church published his papers on Lambda Calculus, a system for expressing any arbitrary computation or algorithm.
--

In Lambda Calculus, you can only define a functions and call functions. Nothing more.

---

# Lambda Calculus

Church encoded numbers in Lambda Calculus using something similar to Peano's numbers. These are called *Church Numerals*:

```
0 = 𝜆𝑓.𝜆𝑥.𝑥
1 = 𝜆𝑓.𝜆𝑥.𝑓𝑥
2 = 𝜆𝑓.𝜆𝑥.𝑓𝑓𝑥
3 = 𝜆𝑓.𝜆𝑥.𝑓𝑓𝑓𝑥
```

---
class: center, middle

## Why are we talking about this?

---
class: center, middle, important-slide

## *Any problem that can be solved by a computer can be solved using functional programming*

---
class: center, middle, important-slide

## *Please don't solve every problem using functional programming*
--


(please don't become a "functional programmer")

---

# Where to go from here
--

- Remember that FP provides tools for decomposing problems and *composing solutions*.
  - Composing solutions well is essential to managing complexity.
--

- Start working in tiny bits of FP into your projects
  - Try refactoring a small function to be pure
  - Make things `const` whenever you can
  - Try using `map`, `reduce`, and `filter`
--

- Read "Why Functional Programming Matters" by John Hughes
--

- Force yourself to program a little each week in a purely functional language!
  - Elm, Elixir, Haskell

---

# Where NOT to go from here
--

- Don't rewrite everything in a functional style!
  - It will be very hard and you will be very sad
--

- Don't read monad tutorials
  - Abstract concepts are hard to understand BECAUSE THEY ARE ABSTRACT. Get concrete knowledge first.
--

- Don't let jargon get you down
--

- Don't write inscrutable functional code that will make your co-workers and future self sad
---

# Interested in more?

- Currying
- Partial Application
- Algebraic Data Types
- Tail recursion
- Functors
- Applicatives
- Monads
- "Point-free" style
- More common FP glue functions

???

We barely scratched the surface here! If you'd like to dig deeper come chat!

---
class: center, middle, important-slide

## Thanks! Questions?
