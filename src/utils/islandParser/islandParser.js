// alphabet weird like this so that certain islands spell certain words/sequences as an easter egg
const ALPHABET = '012345_7x9abSdefThijkHmnupqr6tov-8yzABCDEFYlIJKLMNOPQRcgUVWXGZws';

if (ALPHABET.length < 64) {
  throw new Error('Alphabet not long enough to encode 6 bit characters (111111==64)');
}

const dec2bin = (dec, minLength = 6) => ('00000000000000000000' + (dec.toString(2))).slice(0 - minLength);
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

const isEven = x => x % 2 === 0;

const decodeHeader = header => {
  header = string2binary(header);
  const [nada ,version, cols, offsetX, offsetY] = header.match(/^(.{2})(.{4})(.{3})(.{3})/).map(resultBin => parseInt(resultBin, 2) || 0);

  return {
    version,
    cols,
    offsetX,
    offsetY
  };
};

const string2binary = str => {
  return str.split('').map(char => dec2bin(ALPHABET.indexOf(char))).join('');
};
const binary2string = bin => {
  return (bin.match(/.{1,6}/g) || []).map(binStr => ALPHABET.charAt(parseInt(binStr, 2))).join('');
};

const encodeHeader = ({
  version = 0,
  cols = 8,
  offsetX = 0,
  offsetY = 0
}) => {
  // version is unused for now but in future we could add 1,2,&3 and decode strings differently without breaking existing urls
  version = Math.min(3, version);
  cols = Math.min(15, cols);
  offsetX = Math.min(7, offsetX); // yes, this means you could have a 15 col island that starts way off to the right
  offsetY = Math.min(7, offsetY); // and we can't encode all of that padding but I don't care. Pun intended: it's an edge case.

  let headerBinary = '';
  headerBinary = dec2bin(version, 2);
  headerBinary += dec2bin(cols, 4);
  headerBinary += dec2bin(offsetX, 3);
  headerBinary += dec2bin(offsetY, 3);
  return binary2string(headerBinary);
};

const HEADER_LENGTH = 2;

const splitHeader = str => {
  const { cols } = decodeHeader(str.slice(0, HEADER_LENGTH));
  const islandChars = str.slice(HEADER_LENGTH).split('');
  return {
    cols,
    islandChars
  };
};

const island2String = (isle) => {
  let maxRowLen = 0;
  const bins = flatten(trimEmptyPadding(isle).map(row => {
    if (row.length > maxRowLen) {
      maxRowLen = row.length;
    }
    return row.join('').match(/.{0,6}/g).filter(b => b.length).map(bin => ('000000' + bin).slice(-6));
  }));

  return encodeHeader({ cols: maxRowLen }) + binary2string(bins.join(''));
};

const string2island = (str) => {
  
  const { cols, islandChars } = splitHeader(str);
  const letters = islandChars.map(char => dec2bin(ALPHABET.indexOf(char))).map(bin6 => bin6.split(''));
  const island = [];

  for (let i = 0; i < letters.length; i++) {
    let row = [];
    while (row.length < cols) {
      // Add all the binary this letter encoded
      row = row.concat(letters[i]);
      if (row.length >= cols) {
        // This is now too long; trim it down to length
        row = row.slice(0, cols);
        break;
      }
      // Get ready to look ahead to the next letter
      i++;
    }
    island.push(row.map(b => parseInt(b)));
}

  // Add a moat around the island if needed
  let xMoat = 8 - cols;
  let yMoat = 8 - island.length;
  while (xMoat--) {
    const method = isEven(xMoat) ? 'push' : 'unshift';
    island.forEach(row => {
      row[method](0);
    });
  }
  while (yMoat--) {
    const method = isEven(yMoat) ? 'unshift' : 'push';
    island[method]([0,0,0,0,0,0,0,0]);
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
  string2binary as _string2binary,
  binary2string as _binary2string,
  encodeHeader as _encodeHeader,
  decodeHeader as _decodeHeader,
  dec2bin as _dec2bin,
  transpose as _transpose,
  flatten as _flatten,
  allZeroes as _allZeroes,
  island2String,
  string2island
};