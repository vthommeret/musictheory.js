const constants = require('./constants.js');

const Note = require('./note.js');

const INTERVALS = constants.INTERVALS;
const INTERVAL_MAP = constants.INTERVAL_MAP;

class Interval {
  // One of...
  //   half-steps (7)
  //   name ('P5')
  //   quality, number ('P', 5)
  //   note, note (C4, E4)
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
        const arg0 = arguments[0];
        const arg1 = arguments[1];
        if (arg0 instanceof Note && arg1 instanceof Note) {
          const steps = arg1.index - arg0.index;
          return new Interval(steps);
        } else {
          const name = arg0 + arg1;
          if (INTERVAL_MAP[name] === undefined) {
            throw 'Unknown interval: ' + name + '.';
          }
          this.steps = INTERVAL_MAP[name];
        }
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

module.exports = Interval;
