A set of music theory primitives (notes, intervals, and chords) and basic
functions (inversions, interval addition/subtraction), mostly for learning.

# Example usage

## Notes and Intervals

### Getting middle C

```js
new Note(0)).name() // C₄
```

### Adding major 3rd to C4

```js
let c4 = new Note('C4')
let maj3 = new Interval('M3')
c4.add(maj3).name() // E₄
```

## Chords

### C chord scale degrees

```js
let c = new Chord('C')
c.degrees() // [3, 5]
```

### C7 chord scale degrees

```js
let c = new Chord('C7')
c.degrees() // [3, 5, 7]
```

## Chord inversions

### C chord first inversion

```js
let c = new Chord('C')
let cInv1 = c.invert()
cInv1.degrees() // [3, 6]
```

### C chord second inversion

```js
let c = new Chord('C')
let cInv2 = c.invert(2)
cInv2.degrees() // [4, 6]
```

# Testing

Run `yarn test`.
