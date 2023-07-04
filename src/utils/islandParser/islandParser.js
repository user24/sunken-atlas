const ALPHABET = 'aeiouAEIOUbcdfghjklmnpqrstvwxyz_-BCDFGHJKLMNPQRSTVWXYZ0123456789';

if (ALPHABET.length < 64) {
  throw new Error('Alphabet not long enough to encode 6 bits');
}


const _char2bin = (char) => {
  return ('000000' + ALPHABET.indexOf(char).toString(2)).slice(-6);
};

const flatten = (arr) => [].concat.apply([], arr);
const allZeroes = (row) => row && (row.join('').replaceAll('0', '').length === 0);

const island2String = (isle) => {
  let maxRowLen = 0;
  const binStrs = flatten(isle.filter((row, rowNum) => {
    if (!allZeroes(row)) {
      return true;
    }
    const hasNonEmptyRowBelow = isle.slice(rowNum + 1, isle.length).some(laterRow => !allZeroes(laterRow));
    const hasNonEmptyRowAbove = isle.slice(0, rowNum).some(earlierRow => !allZeroes(earlierRow));

    return hasNonEmptyRowBelow && hasNonEmptyRowAbove;    
  }).map(row => {
    if (row.length > maxRowLen) {
      maxRowLen = row.length;
    }
    return row.join('').match(/.{1,6}/g).map(binStr => (binStr + '000000').slice(0, 6));
  }));

  const chars = binStrs.map(bin => {
    return ALPHABET.charAt(parseInt(bin, 2));
  });

  return ALPHABET.charAt(maxRowLen) + chars.join('');
};

const string2island = (str) => {
  const rowLength = ALPHABET.indexOf(str.charAt(0));
  const letters = str.slice(1).split('').map(_char2bin).map(bin6 => bin6.split(''));
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
  flatten as _flatten,
  allZeroes as _allZeroes,
  island2String,
  string2island
};