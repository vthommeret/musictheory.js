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

module.exports = function (val) {
  return new Chord(val);
};