// Note and interval data

const noteIntervals = [
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

const notes = [];
const intervals = [];

const noteMap = {};
const intervalMap = {};

for (let i = 0; i < noteIntervals.length; i += 2) {
  let noteList = noteIntervals[i];
  let intervalList = noteIntervals[i+1];

  notes.push(noteList);
  intervals.push(intervalList);

  let j = i/2;
  for (let note of noteList) {
    noteMap[note] = j;
  }
  for (let interval of intervalList) {
    intervalMap[interval] = j;
  }
}

const defaultOctave = 4;

class Note {
  // One of...
  //   half-steps from C (2)
  //   name (D)
  // Optional...
  //   octave (4)
  constructor(note, octave) {
    switch (typeof note) {
      case 'string':
        this.index = noteMap[note];
        break;
      case 'number':
        this.index = note % 12;
        break;
      default:
        throw 'Must specify one of...\n' +
          "\tname   ('D')\n" +
          "\tnumber (3)\n";
        break;
    }
    this.octave = octave;
  }

  // Takes Interval
  add(interval) {
    return new Note(this.index + interval.steps);
  }

  // Returns name
  name() {
    let out = notes[this.index][0];
    if (this.octave !== undefined) {
      out += this.octave;
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
            const max = intervals.length - 1;
            if (steps > max) {
              throw 'Interval ' + steps +
                ' is greater than max (' + max + ').';
            }
            this.steps = steps;
            break;
          case 'string':
            const name = arg;
            if (intervalMap[name] === undefined) {
              throw 'Unknown interval: ' + name + '.';
            }
            this.steps = intervalMap[name];
            break;
          default:
            throw 'Unknown argument: ' + arg + '.';
        }
        break;
      case 2:
        const name = arguments[0] + arguments[1];
        if (intervalMap[name] === undefined) {
          throw 'Unknown interval: ' + name + '.';
        }
        this.steps = intervalMap[name];
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
    return intervals[this.steps][0];
  }

  print() {
    console.log(this.name());
  }
}

const note = new Note('D');
note.print();

const interval = new Interval('m3');
const note2 = note.add(interval);
note2.print();
