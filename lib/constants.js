// Note and interval data

const NOTE_INTERVALS = [
  ['C'],        ['P1'],         // 0
  ['C#', 'Db'], ['m2'],         // 1
  ['D'],        ['M2'],         // 2
  ['D#', 'Eb'], ['m3'],         // 3
  ['E'],        ['M3'],         // 4
  ['F'],        ['P4'],         // 5
  ['F#', 'Gb'], ['+4', '°5'],   // 6
  ['G'],        ['P5'],         // 7
  ['G#', 'Ab'], ['m6'],         // 8
  ['A'],        ['M6'],         // 9
  ['A#', 'Bb'], ['m7'],         // 10
  ['B'],        ['M7'],         // 11
  [],           ['P8', 'P8ve'], // 12
];

const MAJOR = 'M';
const MINOR = 'm';
const PERFECT = 'P';
const AUGMENTED = '+';
const DIMINISHED = '°';

const INVERT_QUALITY = {
  'P': 'P',
  'M': 'm',
  'm': 'M',
  '°': '+',
  '+': '°',
};
const INVERT_NUMBER = 9;

const SUBSCRIPT_UNICODE = 8320;

const STEPS = (NOTE_INTERVALS.length - 2) / 2; // 12

const NOTES = [];
const INTERVALS = [];

const NOTE_MAP = {};
const INTERVAL_MAP = {};

for (let i = 0; i < NOTE_INTERVALS.length; i += 2) {
  let noteList = NOTE_INTERVALS[i];
  let intervalList = NOTE_INTERVALS[i+1];

  NOTES.push(noteList);
  INTERVALS.push(intervalList);

  let j = i / 2;
  for (let note of noteList) {
    NOTE_MAP[note] = j;
  }
  for (let interval of intervalList) {
    INTERVAL_MAP[interval] = j;
  }
}

const DEFAULT_OCTAVE = 4;

module.exports = {
  INTERVALS: INTERVALS,
  INTERVAL_MAP: INTERVAL_MAP,

  NOTE_MAP: NOTE_MAP,
  NOTES: NOTES,

  MAJOR: MAJOR,
  MINOR: MINOR,
  AUGMENTED: AUGMENTED,
  DIMINISHED: DIMINISHED,

  STEPS: STEPS,

  DEFAULT_OCTAVE: DEFAULT_OCTAVE,
  SUBSCRIPT_UNICODE: SUBSCRIPT_UNICODE,
};
