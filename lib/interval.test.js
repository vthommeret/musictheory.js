const interval = require('./interval.js');

test('no steps is a perfect unison', () => {
  expect(interval(0).name()).toBe('P1');
});

test('half-step is minor 2nd', () => {
  expect(interval(1).name()).toBe('m2');
});

test('whole step is major 2nd', () => {
  expect(interval(2).name()).toBe('M2');
});

test('3 half steps is minor 3rd', () => {
  expect(interval(3).name()).toBe('m3');
});

test('2 whole steps is major 3rd', () => {
  expect(interval(4).name()).toBe('M3');
});

test('5 half steps is perfect 4th', () => {
  expect(interval(5).name()).toBe('P4');
});

test('3 whole steps is augmented 4th', () => {
  expect(interval(6).name()).toBe('+4');
});

test('7 half steps is perfect fifth', () => {
  expect(interval(7).name()).toBe('P5');
});

test('4 whole steps is minor 6th', () => {
  expect(interval(8).name()).toBe('m6');
});

test('9 half steps is major 6th', () => {
  expect(interval(9).name()).toBe('M6');
});

test('5 whole steps is minor 7th', () => {
  expect(interval(10).name()).toBe('m7');
});

test('11 half steps is major 7th', () => {
  expect(interval(11).name()).toBe('M7');
});

test('4 whole steps is a perfect octave', () => {
  expect(interval(12).name()).toBe('P8');
});
