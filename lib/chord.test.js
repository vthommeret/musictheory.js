const Chord = require('./chord.js');

// Root position chords

test('major chord degrees are 3, 5', () => {
  const c = new Chord('C');
  expect(c.degrees()).toEqual([3, 5]);
});

test('dominant 7 chord degrees are 3, 5, 7', () => {
  const c7 = new Chord('C7');
  expect(c7.degrees()).toEqual([3, 5, 7]);
});

test('m6 chord degrees are 3, 5, 6', () => {
  const c6 = new Chord('C6');
  expect(c6.degrees()).toEqual([3, 5, 6]);
});

test('6 chord degrees are 3, 5, 6', () => {
  const c6 = new Chord('C6');
  expect(c6.degrees()).toEqual([3, 5, 6]);
});

// Inverted chords

test('major chord first inversion degrees are 3, 6', () => {
  const c = new Chord('C');
  const cInv1 = c.invert();
  expect(cInv1.degrees()).toEqual([3, 6]);
});

test('major chord second inversion degrees are 4, 6', () => {
  const c = new Chord('C');
  const cInv2 = c.invert(2);
  expect(cInv2.degrees()).toEqual([4, 6]);
});
