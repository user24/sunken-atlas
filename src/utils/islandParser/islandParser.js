// alphabet weird like this so that certain islands spell certain words/sequences as an easter egg
const ALPHABET = '012345_7x9abSdefThijkHmnupqr6tov-8yzABCDEFYlIJKLMNOPQRcgUVWXGZws';

if (ALPHABET.length < 64) {
  throw new Error('Alphabet not long enough to encode 6 bit characters (111111==64)');
}

const dec2bin = (dec, minLength = 0) => (Array(minLength).fill(0).join('') + (dec.toString(2))).slice(0 - minLength);
const transpose = (matrix) => matrix[0].map((col, i) => matrix.map(row => row[i]));
const flatten = (arr) => [].concat.apply([], arr);
const allZeroes = (row) => row && (row.join('').replaceAll('0', '').length === 0);

const trimTopBottom = isle => {
  return isle.filter((row, rowNum) => {
    if (!allZeroes(row)) {
      return true;
    }
    const hasFilledRowBelow = isle.slice(rowNum + 1).some(laterRow => !allZeroes(laterRow));
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

const decodeHeader = headerStr => {
  const header = string2binary(headerStr);

  if (header.length !== 12) {
    throw new Error(`Invalid header ${headerStr}`);
  }
  const [nada ,version, cols, offsetX, offsetY] = header.match(/^(.{2})(.{4})(.{3})(.{3})/).map(resultBin => parseInt(resultBin, 2) || 0);

  return {
    version,
    cols,
    offsetX,
    offsetY
  };
};

const string2binary = str => {
  return str.split('').map(char => dec2bin(ALPHABET.indexOf(char), 6)).join('');
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
  if (str[str.length - 1] === '/') {
    str = str.slice(0, -1);
  }
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
    return row.join('').match(/.{0,6}/g).filter(b => b.length).map(bin => (bin + '000000').slice(0, 6));
  }));

  let islandString = binary2string(bins.join(''));

  if (islandString[islandString.length - 1] === '-') {
    islandString += '/';
  }

  return encodeHeader({ cols: maxRowLen }) + islandString;
};

const string2island = (str, addMoat = true) => {
  if (!str.length) {
    return [];
  }
  const { cols, islandChars } = splitHeader(str);
  const island = [];

  let row = [];
  for (let i = 0; i < islandChars.length; i++) {
    const decimal = ALPHABET.indexOf(islandChars[i]);
    const binary = dec2bin(decimal, 6);

    row = row.concat(binary.split('').map(b => parseInt(b)));
    if (row.length >= cols) {
      island.push(row.slice(0, cols));
      row = [];
    }
  }

  if (!addMoat) {
    return island;
  }

  const toggleMethod = num => isEven(num) ? 'push' : 'unshift';

  // Add a moat around the island if needed
  let xMoat = 8 - cols;
  let yMoat = 8 - island.length;
  while (xMoat-- > 0) { // the > 0 is because if xMoat<0 at the start, it's infinite loopin' time.
    const method = toggleMethod(xMoat);
    island.forEach(row => {
      row[method](0);
    });
  }
  const atLeast8Cols = Math.max(8, cols);
  const allZeroes = Array(atLeast8Cols).fill(0);
  while (yMoat-- > 0) {
    const method = toggleMethod(yMoat);
    island[method]([...allZeroes]);
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
  splitHeader as _splitHeader,
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