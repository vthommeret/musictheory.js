const mt = require('./lib/musictheory.js');

// Usage

const interval = mt.interval('m2');
interval.print();

const note = mt.note('C');
note.print();

const note2 = note.add(interval);
note2.print();

/*
const note3 = note2.sub(interval);
note3.print();
*/

/*
const M3 = mt.interval('M3');
const m3 = mt.interval('m3');

const root = mt.note('C');
root.print();

const third = root.add(M3);
third.print();

const fifth = third.add(m3);
fifth.print();
*/

/*
const chord = mt.chord('C7');
chord.print();
*/
