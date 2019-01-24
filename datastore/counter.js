const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// input: callback function
// output: a unique ID based on global variable counter
// read file, if there is an error, return null
// else, id is valid, set the global counter to id + 1
// call writeCounter passing in that newly increased counter
// in the callback of writeCounter, zero pad the counter
// invoke the callback passing in counter as a padded str
exports.getNextUniqueId = (callback) => {
  readCounter((err, id) => {
    if (err) {
      return null;
    } else {
      counter = id + 1;
      writeCounter(counter, (err, counterStr) => {
        counter = zeroPaddedNumber(counter);
        callback(null, counter);
      });
    }
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
