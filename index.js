const constants = require('./lib/constants.js');

const INTERVALS = constants.INTERVALS;
const INTERVAL_MAP = constants.INTERVAL_MAP;

const NOTES = constants.NOTES;
const NOTE_MAP = constants.NOTE_MAP;

const MAJOR = constants.MAJOR;
const MINOR = constants.MINOR;
const AUGMENTED = constants.AUGMENTED;
const DIMINISHED = constants.DIMINISHED;

const STEPS = constants.STEPS;

const DEFAULT_OCTAVE = constants.DEFAULT_OCTAVE;
const SUBSCRIPT_UNICODE = constants.SUBSCRIPT_UNICODE;

class Note {
  // One of...
  //   half-steps from C (2)
  //   name (D)
  // Optional...
  //   octave (4)
  //   quality (M)
  constructor(val, octave, quality) {
    const defaultError = 'Must specify one of...\n' +
      "\tname   ('D')\n" +
      "\tnumber (3)\n";
    switch (typeof val) {
      case 'string':
        const octave = parseInt(val.slice(-1), 10);
        if (!isNaN(octave)) {
          this.octave = octave;
          this.index = NOTE_MAP[val.slice(0, -1)];
        } else {
          this.index = NOTE_MAP[val];
        }
        break;
      case 'number':
        this.index = val % STEPS;
        break;
      default:
        throw defaultError;
        break;
    }
    if (this.octave !== undefined) {
      if (octave !== undefined) {
        throw "Can't set octave '" + octave + "'; octave '" + this.octave + "' already specified.";
      }
    } else if (octave !== undefined) {
      this.octave = octave;
    } else {
      this.octave = DEFAULT_OCTAVE;
    }
    this.quality = quality;
  }

  // Adds interval
  add(interval) {
    const sum = this.index + interval.steps;
    const octave = ~~(sum / STEPS);
    return new Note(sum, this.octave + octave, interval.quality);
  }

  // Subtracts interval
  sub(interval) {
    const diff = this.index - interval.steps;

    let sum, octave;
    if (diff < 0) {
      sum = STEPS + diff;
      octave = -1;
    } else {
      sum = diff;
      octave = 0;
    }

    return new Note(sum, this.octave + octave, interval.quality);
  }

  // Returns name
  name() {
    let out = NOTES[this.index];
    if (this.quality === MINOR || this.quality === DIMINISHED) {
      if (out.length === 2) {
        out = out[1];
      }
    } else {
      out = out[0];
    }
    if (this.octave !== undefined) {
      out += String.fromCodePoint(SUBSCRIPT_UNICODE + this.octave);
    }
    return out;
  }

  // Prints name
  print() {
    console.log(this.name());
  }
}

// Intervals

class Interval {
  // One of...
  //   half-steps (7)
  //   name ('P5')
  //   quality, number ('P', 5)
  constructor() {
    switch (arguments.length) {
      case 1:
        const arg = arguments[0];
        switch (typeof arg) {
          case 'number':
            const steps = arg;
            const max = INTERVALS.length - 1;
            if (steps > max) {
              throw 'Interval ' + steps +
                ' is greater than max (' + max + ').';
            }
            this.steps = steps;
            break;
          case 'string':
            const name = arg;
            if (INTERVAL_MAP[name] === undefined) {
              throw 'Unknown interval: ' + name + '.';
            }
            this.steps = INTERVAL_MAP[name];
            break;
          default:
            throw 'Unknown argument: ' + arg + '.';
        }
        break;
      case 2:
        const name = arguments[0] + arguments[1];
        if (INTERVAL_MAP[name] === undefined) {
          throw 'Unknown interval: ' + name + '.';
        }
        this.steps = INTERVAL_MAP[name];
        break;
      default:
        throw 'Must specify one of...\n' +
          "\tname               ('P5')\n" +
          "\thalf-steps         (7)\n" +
          "\tquality and number ('P', 5)";
        break;
    }

    // TODO: How to handle enharmonic augmented 4th / diminished 5th.
    const interval = INTERVALS[this.steps][0];
    this.quality = interval[0];
    this.number = interval[1];
  }

  invert() {
    const quality = INVERT_QUALITY[this.quality];
    // TODO: Derive this formula.
    const number = INVERT_NUMBER - this.number;
    return new Interval(quality + number);
  }
  
  name() {
    return INTERVALS[this.steps][0];
  }

  print() {
    console.log(this.name());
  }
}

// Chords

const CHORDS = [
  ['maj', ''],          ['M3', 'P5'],
  ['m', 'min'],         ['m3', 'P5'],
  ['aug', '+'],         ['M3', 'm6'],
  ['dim', '°'],         ['m3', '°5'],
  ['sus4', 'sus', '4'], ['P4', 'P5'],
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

class Chord {
  constructor(val) {
    let matches = val.match(/([A-Z][#b]?)(.*)/);

    let note = matches[1];
    let type = matches[2];

    this.type = type;

    let pattern = CHORD_MAP[type];

    let root = new Note(note);

    this.notes = [];
    this.notes.push(root);

    for (let interval of pattern) {
      this.notes.push(root.add(new Interval(interval)));
    }
  }

  print() {
    const notes = [];
    for (let note of this.notes) {
      notes.push(note.name());
    }
    console.log(notes.join(', '));
  }
}

// Usage

const interval = new Interval('m2');
interval.print();

const note = new Note('C');
note.print();

const note2 = note.add(interval);
note2.print();

/*
const note3 = note2.sub(interval);
note3.print();
*/

/*
const M3 = new Interval('M3');
const m3 = new Interval('m3');

const root = new Note('C');
root.print();

const third = root.add(M3);
third.print();

const fifth = third.add(m3);
fifth.print();
*/

/*
const chord = new Chord('C7');
chord.print();
*/
