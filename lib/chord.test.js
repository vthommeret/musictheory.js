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

// Major chord inversions

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

// Major 7 chord inversions

test('major 7 chord first inversion degrees are 3, 5, 6', () => {
  const c7 = new Chord('Cmaj7');
  const c7Inv1 = c7.invert();
  expect(c7Inv1.degrees()).toEqual([3, 5, 6]);
});

test('major 7 chord second inversion degrees are 3, 4, 6', () => {
  const c7 = new Chord('Cmaj7');
  const c7Inv2 = c7.invert(2);
  expect(c7Inv2.degrees()).toEqual([3, 4, 6]);
});

test('major 7 chord third inversion degrees are 2, 4, 6', () => {
  const c7 = new Chord('Cmaj7');
  const c7Inv2 = c7.invert(3);
  expect(c7Inv2.degrees()).toEqual([2, 4, 6]);
});
