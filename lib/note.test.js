const note = require('./note.js');
const interval = require('./interval.js');

test('first note is middle C', () => {
  expect(note(0).name()).toBe('C₄');
});

test('adding minor 2nd to C is Db₄', () => {
  let c4 = note('C4');
  let m2 = interval('m2');
  expect(c4.add(m2).name()).toBe('Db₄');
});

test('subtracting minor 2nd from Db₄ is C₄', () => {
  let db4 = note('Db4');
  let m2 = interval('m2');
  expect(db4.sub(m2).name()).toBe('C₄');
});

test('adding major 3rd to C4 is E4', () => {
  let c4 = note('C4');
  let maj3 = interval('M3');
  expect(c4.add(maj3).name()).toBe('E₄');
});

test('adding perfect 5th to C4 is G4', () => {
  let c4 = note('C4');
  let p5 = interval('P5');
  expect(c4.add(p5).name()).toBe('G₄');
});
