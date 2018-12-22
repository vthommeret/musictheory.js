const Note = require('./note.js');
const Interval = require('./interval.js');

const CHORDS = [
  ['maj', ''],          ['M3', 'P5'],
  ['m', 'min'],         ['m3', 'P5'],
  ['aug', '+'],         ['M3', 'm6'],
  ['dim', '°'],         ['m3', '°5'],
  ['sus4', 'sus', '4'], ['P4', 'P5'],
  ['m6'],               ['m3', 'P5', 'M6'],
  ['6'],                ['M3', 'P5', 'M6'],
  ['maj7'],             ['M3', 'P5', 'M7'],
  ['7'],                ['M3', 'P5', 'm7'],
];

const CHORD_MAP = {};

for (let i = 0; i < CHORDS.length; i += 2) {
  let typeList = CHORDS[i];
  let pattern = CHORDS[i+1];
  for (let type of typeList) {
    CHORD_MAP[type] = pattern;
  }
}

const OCTAVE = new Interval('P8');

class Chord {
  // One of...
  //   name ('G7')
  //   notes ([note1, note2, ...])
  constructor(val) {
    if (val.constructor === Array) {
      this._notes = val;
    } else {
      let matches = val.match(/([A-Z][#b]?)(.*)/);

      let note = matches[1];
      let type = matches[2];

      this._type = type;

      let pattern = CHORD_MAP[type];

      let root = new Note(note);

      this._notes = [];
      this._notes.push(root);

      for (let interval of pattern) {
        this._notes.push(root.add(new Interval(interval)));
      }
    }
  }

  // Defaults to first inversion
  invert(n) {
    if (typeof n === 'undefined') {
      n = 1;
    } else if (typeof n !== 'number') {
      throw 'Inversion must be number: ' + n + '.';
    }
    const notes = [];
    const roots = [];
    let i = 0;
    for (let note of this._notes) {
      if (i < n) {
        roots.push(note);
      } else {
        notes.push(note);
      }
      i++;
    }
    // Try using map function
    for (let root of roots) {
      notes.push(root.add(OCTAVE));
    }
    return new Chord(notes);
  }

  notes() {
    const notes = [];
    for (let note of this._notes) {
      notes.push(note.name());
    }
    return notes;
  }

  intervals() {
    const intervals = [];
    let root;
    for (let note of this._notes) {
      if (typeof root === 'undefined') {
        root = note;
      } else {
        intervals.push(new Interval(root, note));
      }
    }
    return intervals;
  }

  degrees() {
    const degrees = [];
    for (let interval of this.intervals()) {
      degrees.push(interval.degree());
    }
    return degrees;
  }

  print() {
    console.log(notes().join(', '));
  }
}

module.exports = Chord;
