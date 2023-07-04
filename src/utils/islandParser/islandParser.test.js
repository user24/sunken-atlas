import {
  island2String,
  string2island,
  _transpose,
  _flatten,
  _allZeroes
} from './islandParser';

describe('Helpers', () => {

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

    expect(_transpose(arr)).toEqual(transposed);
    expect(arr).toEqual(originalArr);
  });


  test('double transpose resets', () => {
    const arr = [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ];
    const originalArr = [...arr];

    expect(_transpose(_transpose(arr))).toEqual(originalArr);
  });


  test('flatten works', () => {
    expect(_flatten([[1,2],[3,4]])).toEqual([1,2,3,4]);
  });

  test('allZeroes works', () => {
    expect(_allZeroes([0])).toBe(true);
    expect(_allZeroes([0,0])).toBe(true);
    expect(_allZeroes([0,0,0])).toBe(true);
    expect(_allZeroes([1])).toBe(false);
    expect(_allZeroes([0,1])).toBe(false);
    expect(_allZeroes([1,0])).toBe(false);
    expect(_allZeroes([0,1,0])).toBe(false);
    expect(_allZeroes([1,1])).toBe(false);
    expect(_allZeroes([1,1,1])).toBe(false);
  });
});

describe('island2string', () => {

  test('handles entirely empty island', () => {
    const island = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    const str = island2String(island);
    expect(str).toBe('x');
});

test('handles completely full island', () => {
  const island = [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
  ];
  const str = island2String(island);
  expect(str).toBe('A8888');
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
      expect(str).toBe('A808');
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
    expect(str).toBe('A808');
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
      expect(str).toBe('A808');
  });

  test('does not remove empty rows inside an island', () => {
    const island = [
      [1,1,1,1,1],
      [0,0,0,0,0],
      [1,1,1,1,1]
    ];
    const str = island2String(island);
    expect(str).toBe('A8x8');
  });
});