const Chord = require('./chord.js');

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
