import expect from 'expect';
import PositionUtils from 'src/util/PositionUtils';
import ObjectUtils from 'src/util/ObjectUtils';
import Position from 'src/api/Position';

describe('Test PositionUtils', () => {
  it('Can calculate geographic bounds', () => {
    const points = [[-15, 30], [12, -5], [15, 3]];
    const idealBounds = [[-15, -5], [15, 30]];

    const bounds = PositionUtils.calcBounds(points);
    expect(ObjectUtils.arrayEquals(bounds, idealBounds)).toBeTruthy();
  });

  it('Can find the geographic center point', () => {
    const points = [
      new Position(-15, 30),
      new Position(12, -5),
      new Position(15, 3),
    ];
    const idealCenter = new Position(4.229336, 9.174339);

    const center = PositionUtils.calcCenter(points);
    expect(Math.abs(center.latitude - idealCenter.latitude)).toBeLessThan(1.0);
    expect(Math.abs(center.longitude - idealCenter.longitude)).toBeLessThan(1.0);
  });
});
