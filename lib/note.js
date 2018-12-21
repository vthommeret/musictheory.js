const constants = require('./constants.js');

const NOTES = constants.NOTES;
const NOTE_MAP = constants.NOTE_MAP;

const MINOR = constants.MINOR;
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

module.exports = Note;
