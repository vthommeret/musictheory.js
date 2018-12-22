const Interval = require('./interval.js');
const Note = require('./note.js');

// Half-step tests

test('no steps is a perfect unison', () => {
  expect((new Interval(0)).name()).toBe('P1');
});

test('half-step is minor 2nd', () => {
  expect((new Interval(1)).name()).toBe('m2');
});

test('whole step is major 2nd', () => {
  expect((new Interval(2)).name()).toBe('M2');
});

test('3 half steps is minor 3rd', () => {
  expect((new Interval(3)).name()).toBe('m3');
});

test('2 whole steps is major 3rd', () => {
  expect((new Interval(4)).name()).toBe('M3');
});

test('5 half steps is perfect 4th', () => {
  expect((new Interval(5)).name()).toBe('P4');
});

test('3 whole steps is augmented 4th', () => {
  expect((new Interval(6)).name()).toBe('+4');
});

test('7 half steps is perfect fifth', () => {
  expect((new Interval(7)).name()).toBe('P5');
});

test('4 whole steps is minor 6th', () => {
  expect((new Interval(8)).name()).toBe('m6');
});

test('9 half steps is major 6th', () => {
  expect((new Interval(9)).name()).toBe('M6');
});

test('5 whole steps is minor 7th', () => {
  expect((new Interval(10)).name()).toBe('m7');
});

test('11 half steps is major 7th', () => {
  expect((new Interval(11)).name()).toBe('M7');
});

test('4 whole steps is a perfect octave', () => {
  expect((new Interval(12)).name()).toBe('P8');
});

// Note -> note tests

test('C -> E is a major 3rd', () => {
  const c = new Note('C');
  const e = new Note('E');
  expect((new Interval(c, e)).name()).toBe('M3');
});

test('C -> G is a perfect 5th', () => {
  const c = new Note('C');
  const g = new Note('G');
  expect((new Interval(c, g)).name()).toBe('P5');
});

// First inversion test

test('E4 -> G4 is degree 3', () => {
  const e4 = new Note('E4');
  const g4 = new Note('G4');
  expect((new Interval(e4, g4)).degree()).toBe(3);
});

test('E4 -> C5 is degree 6', () => {
  const e4 = new Note('E4');
  const c5 = new Note('C5');
  expect((new Interval(e4, c5)).degree()).toBe(6);
});

// Second inversion test

test('G4 -> C5 is degree 4', () => {
  const g4 = new Note('G4');
  const c5 = new Note('C5');
  expect((new Interval(g4, c5)).degree()).toBe(4);
});

test('G4 -> E5 is degree 6', () => {
  const g4 = new Note('G4');
  const e5 = new Note('E5');
  expect((new Interval(g4, e5)).degree()).toBe(6);
});
