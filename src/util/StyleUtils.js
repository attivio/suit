// @Flow

/**
 * Utility class that provdides CSS-related functionality.
 */
export default class StyleUtils {
  /**
   * Parse the passed-in CSS color into its red, green, and blue values
   * (each of which will be an integer between 0 and 255). This method
   * ignores any alpha value if the color is in the "rgba()" format.
   *
   * NOTE: For now, it only handles HEX color values...
   */
  static parseColor(colorToParse: string, tryCssColorNames: boolean = true): [number, number, number] {
    const color = colorToParse ? colorToParse.trim() : '';
    if (color) {
      if (color.charAt(0) === '#') {
        const hexColor = color.substr(1);
        if (hexColor.length === 6) {
          const redString = hexColor.substr(0, 2);
          const red = parseInt(redString, 16);
          const greenString = hexColor.substr(2, 2);
          const green = parseInt(greenString, 16);
          const blueString = hexColor.substr(4, 2);
          const blue = parseInt(blueString, 16);
          return [red, green, blue];
        } else if (hexColor.length === 3) {
          const redString = hexColor.substr(0, 1);
          const red = parseInt(redString, 16) * 16;
          const greenString = hexColor.substr(1, 1);
          const green = parseInt(greenString, 16) * 16;
          const blueString = hexColor.substr(2, 1);
          const blue = parseInt(blueString, 16) * 16;
          return [red, green, blue];
        }
      } else if (color.startsWith('rgb(') || color.startsWith('rgba(')) {
        const openingParenIndex = color.indexOf('(');
        const closingParenIndex = color.lastIndexOf(')');
        const numbersString = color.substr(openingParenIndex + 1, closingParenIndex - openingParenIndex);
        const numbers = numbersString.split(',');
        if (numbers.length >= 3) {
          const red = parseInt(numbers[0].trim(), 10);
          const green = parseInt(numbers[1].trim(), 10);
          const blue = parseInt(numbers[2].trim(), 10);
          return [red, green, blue];
        }
      } else if (tryCssColorNames) {
        // See if it's a valid named CSS color
        const d = document.createElement('div');
        d.style.color = color;
        document.body.appendChild(d);
        const rgbColor = window.getComputedStyle(d).color;
        document.body.removeChild(d);
        if (rgbColor.startsWith('rgb(')) {
          return StyleUtils.parseColor(rgbColor, false);
        }
      }
    }
    // Can't parse the color; return black
    return [0, 0, 0];
  }

  /**
   * Given two integers, find a new one that is "percentage" percent of the
   * way from "from" to "to." Percentage is a number between 0 and 1.0. This is
   * done over the squares of the numbers.
   */
  static blendInts(from: number, to: number, percentage: number = 0.5): number {
    let pct = percentage;
    if (pct > 1.0) {
      pct = 1.0;
    } else if (pct < 0) {
      pct = 0;
    }
    const realTo = to * to;
    const realFrom = from * from;
    const realDiff = realTo - realFrom;
    const realPercentageDiff = realDiff * pct;
    const realValue = realFrom + realPercentageDiff;
    const newValue = Math.round(Math.sqrt(realValue));
    return newValue;
  }

  /**
   * Given a three-element array with the RGB values for a color, create
   * a CSS hex color string starting with an octothorpe.
   */
  static toHexColor(color: [number, number, number]): string {
    const [red, green, blue] = color;
    let redString;
    let greenString;
    let blueString;

    if (red % 16 === 0 && green % 16 === 0 && blue % 16 === 0) {
      // Special case: we can name that color in only 3 digits...
      redString = red.toString(16).charAt(0);
      greenString = green.toString(16).charAt(0);
      blueString = blue.toString(16).charAt(0);
    } else {
      redString = red.toString(16);
      if (redString.length === 1) {
        redString = `0${redString}`;
      }
      greenString = green.toString(16);
      if (greenString.length === 1) {
        greenString = `0${greenString}`;
      }
      blueString = blue.toString(16);
      if (blueString.length === 1) {
        blueString = `0${blueString}`;
      }
    }
    return `#${redString}${greenString}${blueString}`.toUpperCase();
  }

  /**
   * Takes two CSS colors, from and to, and calculates a new color "percentage"
   * percent of the way from "from" to "to." Percentage should be between 0 and 1.0.
   * Both the from and to parameters can be hex strings prefixed with an octothorpe
   * (either 3 or 6 digits), expressions with rgb() or rgba(), or valid CSS color
   * names.
   * It always returns a hex encoded number prefixed with an octothorpe, e.g., "#f2a902,"
   * regardless of the format of the original colors.
   */
  static blendColors(from: string, to: string, percentage: number = 0.5): string {
    const fromParsed = StyleUtils.parseColor(from);
    const toParsed = StyleUtils.parseColor(to);

    const newRed = StyleUtils.blendInts(fromParsed[0], toParsed[0], percentage);
    const newGreen = StyleUtils.blendInts(fromParsed[1], toParsed[1], percentage);
    const newBlue = StyleUtils.blendInts(fromParsed[2], toParsed[2], percentage);

    return StyleUtils.toHexColor([newRed, newGreen, newBlue]);
  }

  /**
   * Takes a CSS color, orig, and lightens it by the specified percentage, which
   * should be between 0 and 1.0 (where 0 is the original color and 1.0 is white).
   * (This is the equivalent of calling blendColors() with the value of "to" set
   * to white.)
   * The orig parameter can be a hex string prefixed with an octothorpe
   * (either 3 or 6 digits), an expression with rgb() or rgba(), or a valid CSS
   * color name.
   * It always returns the color as a hex string
   * prefixed with an octothorpe, e.g., "#f2a902," regardless of the format of the
   * original color.
   */
  static lightenColor(orig: string, percentage: number = 0.5): string {
    const origParsed = StyleUtils.parseColor(orig);

    const newRed = StyleUtils.blendInts(origParsed[0], 255, percentage);
    const newGreen = StyleUtils.blendInts(origParsed[0], 255, percentage);
    const newBlue = StyleUtils.blendInts(origParsed[0], 255, percentage);

    return StyleUtils.toHexColor([newRed, newGreen, newBlue]);
  }

  /**
   * Takes a CSS color, orig, and darkens it by the specified percentage, which
   * should be between 0 and 1.0 (where 0 is the original color and 1.0 is black).
   * (This is the equivalent of calling blendColors() with the value of "to" set
   * to black.)
   * The orig parameter can be a hex string prefixed with an octothorpe
   * (either 3 or 6 digits), an expression with rgb() or rgba(), or a valid CSS
   * color name.
   * It always returns the color as a hex string
   * prefixed with an octothorpe, e.g., "#f2a902," regardless of the format of the
   * original color.
   */
  static darkenColor(orig: string, percentage: number = 0.5): string {
    const origParsed = StyleUtils.parseColor(orig);

    const newRed = StyleUtils.blendInts(origParsed[0], 0, percentage);
    const newGreen = StyleUtils.blendInts(origParsed[0], 0, percentage);
    const newBlue = StyleUtils.blendInts(origParsed[0], 0, percentage);

    return StyleUtils.toHexColor([newRed, newGreen, newBlue]);
  }
}
