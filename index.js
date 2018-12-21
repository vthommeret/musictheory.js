const Note = require('./lib/note.js');
const Interval = require('./lib/interval.js');
const Chord = require('./lib/chord.js');

module.exports = {
  Note: Note,
  note: function (val, octave, quality) {
    return new Note(val, octave, quality);
  },

  Interval: Interval,
  interval: function () {
    return new interval.Interval(...arguments);
  },

  Chord: Chord,
  chord: function (val) {
    return new chord.Chord(val);
  },
};
