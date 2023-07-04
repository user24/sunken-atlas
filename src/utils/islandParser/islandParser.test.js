import {
  island2String,
  string2island,
  _flatten,
  _allZeroes
} from './islandParser';

describe('Island Parser', () => {

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

  test('island2string removes all leading and trailing empty rows', () => {
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

  test('island2string does not remove empty rows inside an island', () => {
    const island = [
      [1,1,1,1,1],
      [0,0,0,0,0],
      [1,1,1,1,1]
    ];
    const str = island2String(island);
    expect(str).toBe('A8a8');
  });
});