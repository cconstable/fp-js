class: center, middle

<div style="color:#F78C6A">
# Functional Programming
The universality of fold
</div>
Chris Constable

---

# Review

- higher-order functions
- `map`, `filter`, and `reduce`
- recursive functions can replace loops

---

# Review

```js
[1, 2, 3].reduce(0, (acc, x) => acc + x)

(((0 + 1) + 2) + 3)

6
```

---

# Review

```js
`[1, 2, 3]`.reduce(0, (acc, x) => acc + x)

(((0 + 1) + 2) + 3)

6
```

---

# Review

```js
[1, 2, 3].reduce(`0`, (acc, x) => acc + x)

(((0 + 1) + 2) + 3)

6
```

---

# Review

```js
[1, 2, 3].reduce(0, `(acc, x) => acc + x`)

(((0 + 1) + 2) + 3)

6
```

---

# Review

```js
[1, 2, 3].reduce(`0`, (acc, x) => acc + x)

((`(0 + 1)` + 2) + 3)

6
```

---

# Review

```js
[1, 2, 3].reduce(0, (acc, x) => acc + x)

(((0 + 1) + 2) + 3)

`6`
```

---

class: center, middle, important-slide

## *3 challenges*

---

<div style="color:#6C7BD0">
# > Challenge 1
</div>
*The universality of fold:* Using only `reduce`, implement `map` and `filter`.

--

If that seems a bit too difficult, try implementing `map` or `filter` on your own without `reduce`.

--

If that still seems a bit too much pair up with someone!

---

---

```js
function map(f, list) {
    return list.reduce(
        (acc, x) => acc.concat([f(x)]),
        []
    )
}

function filter(pred, list) {
    return list.reduce(
        (acc, x) => pred(x) ? acc.concat([x]) : acc,
        []
    )
}
```

---

When we use reduce it goes from left-to-right:

```
------------>
(((i a) b) c)
```

--

What if we want to reduce right-to-left?

```
<------------
(a (b (c i)))
```

--

Who cares?

---

foldl

```
------------>
(((i a) b) c)
```

foldr

```
<------------
(a (b (c i)))
```

---

foldl (`reduce` in Javascript)

```
------------>
(((i a) b) c)
```

foldr

```
<------------
(a (b (c i)))
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
ghci> foldr (-) 52 [12, 30, 21]
-49

node> [12, 30, 21].reduceRight((acc, x) => acc - x, 52)
-11
```
---

<div style="color:#6C7BD0">
# > Challenge 2
</div>
Show that Javascript's `reduceRight` (aka `foldr`) violates the *3rd duality theorem* of fold which states that:

<br />
$$
\mathit{foldr} \ (\oplus) \ a \ \mathit{xs} = \mathit{foldl} \; (\widetilde{\oplus}) \; a \; \mathit{xs}^{reversed}
$$

$$
\text{where} \quad a \oplus b = b \: \widetilde{\oplus} \: a
$$

---

---

```js
const initial   = 52
const list      = [12, 30, 21]
const listR     = list.reverse()

const f = (acc, x) => acc - x
const g = (x, acc) => acc - x

`list`.reduce(f, initial) == `listR`.reduceRight(g, initial)

// false :(
```

---

<div style="color:#6C7BD0">
# > Challenge 3
</div>
*The universality of foldr:* Write a version of `reduceRight` (aka `foldr`) that obeys the *3rd duality theorem*. Using only the `foldr` function, implement `foldl`.

--

I'm not going to discuss the answer to this because it's pretty mind-bending. Graham Hutton published a paper on it called "A tutorial on the universality and expressiveness of fold". I've written a `Javascript solution` in the source repo for these slides.

---

## Summary

- folds encapsulates recursion
- using folds alone it is possible to implement an astounding number of useful functions
- `foldr` can be used to implement `foldl`
- don't write cryptic folds that nobody will understand in a week
- check out the `source` for the solution to challenge 3
