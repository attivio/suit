import expect from 'expect';
import StyleUtils from 'src/util/StyleUtils';

describe('Test StyleUtils', () => {
  it('Parses CSS colors', () => {
    // Try 6 hex digits
    let parsed = StyleUtils.parseColor('#ffffff');
    expect(parsed.length).toEqual(3);
    expect(parsed[0]).toEqual(255);
    expect(parsed[1]).toEqual(255);
    expect(parsed[2]).toEqual(255);
    // Try 3 hex digits
    parsed = StyleUtils.parseColor('#000');
    expect(parsed.length).toEqual(3);
    expect(parsed[0]).toEqual(0);
    expect(parsed[1]).toEqual(0);
    expect(parsed[2]).toEqual(0);
    // Try rgb()
    parsed = StyleUtils.parseColor('rgb( 15, 72, 229)');
    expect(parsed.length).toEqual(3);
    expect(parsed[0]).toEqual(15);
    expect(parsed[1]).toEqual(72);
    expect(parsed[2]).toEqual(229);
    // Try rgba()
    parsed = StyleUtils.parseColor('rgba( 222, 17, 0  )');
    expect(parsed.length).toEqual(3);
    expect(parsed[0]).toEqual(222);
    expect(parsed[1]).toEqual(17);
    expect(parsed[2]).toEqual(0);
    // Try named colors
    parsed = StyleUtils.parseColor('lightblue');
    expect(parsed.length).toEqual(3);
    expect(parsed[0]).toEqual(173);
    expect(parsed[1]).toEqual(216);
    expect(parsed[2]).toEqual(230);
  });

  it('Blends integers', () => {
    expect(StyleUtils.blendInts(0, 255)).toEqual(180);
    expect(StyleUtils.blendInts(0, 255, 0)).toEqual(0);
    expect(StyleUtils.blendInts(0, 255, 1)).toEqual(255);
    expect(StyleUtils.blendInts(100, 200, 0.35)).toEqual(143);
  });

  it('Blends colors', () => {
    expect(StyleUtils.blendColors('black', 'white')).toEqual('#B4B4B4');
    expect(StyleUtils.blendColors('#3238ff', '#f87207', 0.75)).toEqual('#D86780');
    expect(StyleUtils.blendColors('#64C800', '#C86464', 0.35)).toEqual('#8FAC3B');
    expect(StyleUtils.blendColors('rgba(100, 200, 0)', 'rgba(200, 100, 100'), 0.35).toEqual('#478D00');
  });
});
