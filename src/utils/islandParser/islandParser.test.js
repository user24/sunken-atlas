import {
  island2String,
  string2island,
  _string2binary as string2binary,
  _binary2string as binary2string,
  _dec2bin as dec2bin,
  _transpose as transpose,
  _flatten as flatten,
  _allZeroes as allZeroes,
  _encodeHeader as encodeHeader,
  _decodeHeader as decodeHeader
} from './islandParser';

describe('header', () => {
  test('encode cols', () => {
    const header = encodeHeader({
      version: 1,
      cols: 2,
      offsetX: 3,
      offsetY: 4
    });
    expect(header).toBe('i6');
    const decoded = decodeHeader(header);
    expect(decoded.version).toBe(1);
    expect(decoded.cols).toBe(2);
    expect(decoded.offsetX).toBe(3);
    expect(decoded.offsetY).toBe(4);
  });
  test('all zeroes', () => {
    const header = encodeHeader({
      version: 0,
      cols: 0,
      offsetX: 0,
      offsetY: 0
    });
    expect(header.length).toBe(2);
    const decoded = decodeHeader(header);
    expect(decoded.version).toBe(0);
    expect(decoded.cols).toBe(0);
    expect(decoded.offsetX).toBe(0);
    expect(decoded.offsetY).toBe(0);
  });
  test('all maxxed', () => {
    const header = encodeHeader({
      version: 3,
      cols: 15,
      offsetX: 7,
      offsetY: 7
    });
    expect(header.length).toBe(2);
    const decoded = decodeHeader(header);
    expect(decoded.version).toBe(3);
    expect(decoded.cols).toBe(15);
    expect(decoded.offsetX).toBe(7);
    expect(decoded.offsetY).toBe(7);
  });
});

describe('Helpers', () => {

  test('dec2bin', () => {
    let bin = dec2bin(1, 6);
    expect(bin).toBe('000001');
    bin = dec2bin(2, 6);
    expect(bin).toBe('000010');
    bin = dec2bin(2,3);
    expect(bin).toBe('010');
    bin = dec2bin(7,3);
    expect(bin).toBe('111');
    bin = dec2bin(8,4);
    expect(bin).toBe('1000');
    bin = dec2bin(8,5);
    expect(bin).toBe('01000');
    bin = dec2bin(15,4);
    expect(bin).toBe('1111');
    bin = dec2bin(15,6);
    expect(bin).toBe('001111');
  });

  test('string-binary', () => {
    expect(string2binary('abc')).toBe('001010001011110110');
    expect(binary2string(string2binary('abc'))).toBe('abc');

    expect(string2binary('x0')).toBe('001000000000');
    expect(binary2string(string2binary('x0'))).toBe('x0');

  });

  test('transpose works', () => {
    const arr = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ];
    const originalArr = [...arr];

    const transposed = [
      [1,4,7],
      [2,5,8],
      [3,6,9]
    ];

    expect(transpose(arr)).toEqual(transposed);
    expect(arr).toEqual(originalArr);
  });


  test('double transpose resets', () => {
    const arr = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ];
    const originalArr = [...arr];

    expect(transpose(transpose(arr))).toEqual(originalArr);
  });


  test('flatten works', () => {
    expect(flatten([[1,2],[3,4]])).toEqual([1,2,3,4]);
  });

  test('allZeroes works', () => {
    expect(allZeroes([0])).toBe(true);
    expect(allZeroes([0,0])).toBe(true);
    expect(allZeroes([0,0,0])).toBe(true);
    expect(allZeroes([1])).toBe(false);
    expect(allZeroes([0,1])).toBe(false);
    expect(allZeroes([1,0])).toBe(false);
    expect(allZeroes([0,1,0])).toBe(false);
    expect(allZeroes([1,1])).toBe(false);
    expect(allZeroes([1,1,1])).toBe(false);
  });
});

describe('island-parsing', () => {

  test('handles long island', () => {
    const island = string2island('a0UGsGG6', false);
    expect(island).toEqual([
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1]
    ]);
  });

  test('handles long island with moat', () => {
    const island = string2island('a0UGsGG6');
    expect(island).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
  });

  test('centers island in a moat', () => {
    const string = island2String([
      [[1]]
    ]);
    expect(string).toBe('10-/');

    const island = string2island(string);
    expect(island).toEqual([
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ]);
  });

  test('modifying moat only affects that row', () => {
    // (if this fails, we are adding moat by ref not value)
    const island = [
      [0,0,1,1,0],
      [0,0,1,1,0]
    ];
    const str = island2String(island);
    const isle = string2island(str);
    isle[0][1] = 1;
    expect(isle[1][1]).toBe(0);
    expect(isle[2][1]).toBe(0);
    expect(isle[5][1]).toBe(0);
    expect(isle[6][1]).toBe(0);
    expect(isle[7][1]).toBe(0);
  });

  test('handles entirely empty island', () => {
    const island = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    const str = island2String(island);
    expect(str).toBe('00');
    expect(string2island(str, false)).toEqual([]);
  });

  test('handles completely full island', () => {
    const island = [
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1]
    ];
    const str = island2String(island);
    expect(str).toBe('50wwww');
    expect(string2island(str, false)).toEqual([
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1],
      [1,1,1,1,1]
    ]);
  });

  test('handles island exactly 8 columns', () => {
    const island = [
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1],
    ];
    const str = island2String(island);
    expect(str).toBe('x0sMsMsMsM');
    expect(JSON.stringify(string2island(str, false))).toEqual(JSON.stringify(island));
  });

  test('removes leading empty rows', () => {
      const island = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,1,1,1],
        [1,1,0,1,1],
        [1,1,1,1,1]
      ];
      const str = island2String(island);
      expect(str).toBe('50wcw');
      expect(string2island(str, false)).toEqual([
        [1,1,1,1,1],
        [1,1,0,1,1],
        [1,1,1,1,1]
      ]);
  });

  test('removes trailing empty rows', () => {
    const island = [
      [1,1,1,1,1],
      [1,1,0,1,1],
      [1,1,1,1,1],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    const str = island2String(island);
    expect(str).toBe('50wcw');
    expect(string2island(str, false)).toEqual([
      [1,1,1,1,1],
      [1,1,0,1,1],
      [1,1,1,1,1]
    ]);
  });

  test('removes leading and trailing empty rows', () => {
      const island = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,1,1,1,1],
        [1,1,0,1,1],
        [1,1,1,1,1],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ];
      const str = island2String(island);
      expect(str).toBe('50wcw');
      expect(string2island(str, false)).toEqual([
        [1,1,1,1,1],
        [1,1,0,1,1],
        [1,1,1,1,1]
      ]);
  });

  test('does not remove empty rows inside an island', () => {
    const island = [
      [1,1,1,1,1],
      [0,0,0,0,0],
      [1,1,1,1,1]
    ];
    const str = island2String(island);
    expect(str).toBe('50w0w');
    expect(string2island(str, false)).toEqual(island);
  });
  
  test('adds trailing slash where needed', () => {
    const island = [
      [0,0,0,0,1,0,0,0]
    ];
    const str = island2String(island);
    expect(str).toBe('10-/');
    expect(string2island(str, false)).toEqual([[1]]);
  });
});
