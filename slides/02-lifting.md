
Part 2

---

Recap from last time...

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
