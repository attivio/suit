import Card from '../../src/components/Card';
import StyleUtils from '../../src/util/StyleUtils';

describe('Test StyleUtils', () => {
  describe('Parses CSS colors', () => {
    test('Parses 6 hex digits', () => {
      const parsed = StyleUtils.parseColor('#ffffff');
      expect(parsed.length).toEqual(3);
      expect(parsed[0]).toEqual(255);
      expect(parsed[1]).toEqual(255);
      expect(parsed[2]).toEqual(255);
    });

    test('Parses 3 hex digits', () => {
      const parsed = StyleUtils.parseColor('#000');
      expect(parsed.length).toEqual(3);
      expect(parsed[0]).toEqual(0);
      expect(parsed[1]).toEqual(0);
      expect(parsed[2]).toEqual(0);
    });

    test('Parses rgb()', () => {
      const parsed = StyleUtils.parseColor('rgb( 15, 72, 229)');
      expect(parsed.length).toEqual(3);
      expect(parsed[0]).toEqual(15);
      expect(parsed[1]).toEqual(72);
      expect(parsed[2]).toEqual(229);
    });

    test('Parses rgba(', () => {
      const parsed = StyleUtils.parseColor('rgba( 222, 17, 0  )');
      expect(parsed.length).toEqual(3);
      expect(parsed[0]).toEqual(222);
      expect(parsed[1]).toEqual(17);
      expect(parsed[2]).toEqual(0);
    });
  });

  test('Blends integers', () => {
    expect(StyleUtils.blendInts(0, 255)).toEqual(180);
    expect(StyleUtils.blendInts(0, 255, 0)).toEqual(0);
    expect(StyleUtils.blendInts(0, 255, 1)).toEqual(255);
    expect(StyleUtils.blendInts(100, 200, 0.35)).toEqual(143);
  });

  test('Blends hex colors', () => {
    expect(StyleUtils.blendColors('#3238ff', '#f87207', 0.75)).toEqual('#D86780');
    expect(StyleUtils.blendColors('#64C800', '#C86464', 0.35)).toEqual('#8FAC3B');
  });
});
