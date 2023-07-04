// alphabet weird like this so that certain islands spell certain words/sequences as an easter egg
const ALPHABET = '012345_7x9abSdefThijkHmnupqr6tov-8yzABCDEFYlIJKLMNOPQRcGUVWXYwgs';

if (ALPHABET.length < 64) {
  throw new Error('Alphabet not long enough to encode 6 bit characters (111111==64)');
}

const char2bin = (char) => ('000000' + ALPHABET.indexOf(char).toString(2)).slice(-6);
const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));
const flatten = (arr) => [].concat.apply([], arr);
const allZeroes = (row) => row && (row.join('').replaceAll('0', '').length === 0);

const trimTopBottom = isle => {
  return isle.filter((row, rowNum) => {
    if (!allZeroes(row)) {
      return true;
    }
    const hasFilledRowBelow = isle.slice(rowNum + 1, isle.length).some(laterRow => !allZeroes(laterRow));
    const hasFilledRowsAboveAndBelow = hasFilledRowBelow && isle.slice(0, rowNum).some(earlierRow => !allZeroes(earlierRow));

    return hasFilledRowsAboveAndBelow;
  });
}

const trimEmptyPadding = isle => {
  if (isle.length === 0) {
    return [];
  }
  const rotatedTrimmedIsle = trimTopBottom(transpose(isle));
  if (rotatedTrimmedIsle.length === 0) {
    // completely empty island
    return [[]];
  }
  return trimTopBottom(transpose(rotatedTrimmedIsle));
};


const island2String = (isle) => {
  let maxRowLen = 0;
  const binStrs = flatten(trimEmptyPadding(isle).map(row => {
    if (row.length > maxRowLen) {
      maxRowLen = row.length;
    }
    const sixBitChunks = row.join('').match(/.{1,6}/g);
    return (sixBitChunks || []).map(binStr => (binStr + '000000').slice(0, 6));
  }));

  const chars = binStrs.map(bin => {
    return ALPHABET.charAt(parseInt(bin, 2));
  });

  return ALPHABET.charAt(maxRowLen) + chars.join('');
};

const string2island = (str) => {
  const rowLength = ALPHABET.indexOf(str.charAt(0));
  const letters = str.slice(1).split('').map(char2bin).map(bin6 => bin6.split(''));
  const island = [];

  for (let i = 0; i < letters.length; i++) {
    let row = [];
    while (row.length < rowLength) {
      // Add all the binary this letter encoded
      row = row.concat(letters[i]);
      if (row.length >= rowLength) {
        // This is now too long; trim it down to length
        row = row.slice(0, rowLength);
        break;
      }
      // Get ready to look ahead to the next letter
      i++;
    }
    island.push(row.map(b => parseInt(b)));
  }
  return island;
};

/**
const island = [
[0,0,0,1,1,1,0,0,0],
[0,0,1,1,1,1,1,0,0],
[0,1,1,1,0,1,1,1,0],
[1,1,1,0,0,0,1,1,1],
[1,1,0,0,0,0,0,1,1]
];

const str = IslandConverter.island2String(island);
console.log(str, IslandConverter.string2island(str).map(row=>row.join()));
**/

export {
  transpose as _transpose,
  flatten as _flatten,
  allZeroes as _allZeroes,
  island2String,
  string2island
};