class: center, middle

<div style="color:#F78C6A">
# Functional Programming
Level 2: 
</div>
Chris Constable

---

# Recap

- higher-order functions
- `map` and `reduce`
- recursive functions can replace loops
- functions can replace *everything* (even numbers)
- `monoids` are things that we can `reduce`

---

<div style="color:#6C7BD0">
# > Exercise 1
</div>
- Make sure the person sitting next to you knows what `map` and `reduce` are and how recursive functions can replace loops
- If you think this is boring implement `foldl` in terms of `foldr` ;)

---

When we use reduce it goes from left-to-right:

```
------------>
(((a b) c) d)
```

--

What if we want to reduce right-to-left?

```
<------------
(a (b (c d)))
```

--

Who cares?

---

foldl

```
------------>
(((a b) c) d)
```

foldr

```
<------------
(a (b (c d)))
```

---

foldl (`reduce` in Javascript)

```
------------>
(((a b) c) d)
```

foldr

```
<------------
(a (b (c d)))
```

---

```js
// Haskell
foldl (++) "a" ["b", "c"]                      // "abc"

// Scala
Array("b", "c").foldLeft("a")(_ + _)           // "abc"

// JS
["b", "c"].reduce((acc, x) => acc + x, "a")    // "abc"
```

---

```js
// Haskell
foldr (++) "a" ["b", "c"]                         // "bca"

// Scala
Array("b", "c").foldRight("a")(_ + _)             // "bca"
```

---

```js
// Haskell
foldr (++) "a" ["b", "c"]                         // "bca"

// Scala
Array("b", "c").foldRight("a")(_ + _)             // "bca"

// JS
["b", "c"].reduceRight((acc, x) => acc + x, "a")  // "acb"
```

---


```js
ghci> foldr (\acc x -> acc - x) 52 [12, 30, 21]
-49

node> [12, 30, 21].reduceRight((acc, x) => acc - x, 52)
-11
```

---

class: center, middle, important-slide

## *don't use reduceRight in javascript*

---

Currying

- Any N-arity function can be converted to N single-argument functions
- Currying can help us reuse functions in different contexts
- Currying can let us "pre-fill" some values
- Currying can help us line up types properly

---

- We talked about `map` and `reduce`
- We also learned that `monoids` are things that we can `reduce`
- What about `map`? Do mappable things have a fancy name?

---

Functor

---

- endofunctor
- bifunctor (e.g. the `Either` type maps two things)
- covariance and contravariance

---

A free-standing map implementation of map:

```js
```

---

Lifting

- Lifting allows you take a value or function and "wrap" it in a context or structure.
- Examples
- Lift2
- Show the standalone map we made earlier. Look at the signature. Show that it matches `lift`! Map is a form of lifting!
