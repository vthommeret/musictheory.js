// Note and interval data

const NOTE_INTERVALS = [
  ['C'],        ['PU', 'P1'],   // 0
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

const SUBSCRIPT = 8320;

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

const defaultOctave = 4;

class Note {
  // One of...
  //   half-steps from C (2)
  //   name (D)
  // Optional...
  //   octave (4)
  constructor(val, octave) {
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
      this.octave = defaultOctave;
    }
  }

  // Takes Interval
  add(interval) {
    const sum = this.index + interval.steps;
    const octave = Math.floor(sum / STEPS);
    return new Note(sum, this.octave + octave);
  }

  // Returns name
  name() {
    let out = NOTES[this.index][0];
    if (this.octave !== undefined) {
      out += String.fromCodePoint(SUBSCRIPT + this.octave);
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
  }
  
  name() {
    return INTERVALS[this.steps][0];
  }

  print() {
    console.log(this.name());
  }
}

const M3 = new Interval('M3');
const m3 = new Interval('m3');

const root = new Note('C');
root.print();

const third = root.add(M3);
third.print();

const fifth = third.add(m3);
fifth.print();
