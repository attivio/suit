// @flow

export default class StringUtils {
  /**
   * Simply format a string/number combination based on the
   * value of the number. The format parameter is a string
   * containing multiple formatting templates separated by
   * a pipe character (|). If there are two parts, then the
   * first part is used if the value is 1 and the second part
   * is used if the value is not 1 (e.g., 0 or > 1). If there
   * are three parts, then the first is used if the value is
   * 0, the second if the value is 1 and the third if the
   * value is > 1. (If there is only one part, then it's used
   * in all cases.)
   *
   * In any case, if the part of the string being used contains
   * the charaters '{}', that is substituted with the number
   * itself, as a string.
   *
   * @param {*} format the format string
   * @param {*} value  the numeric value to switch on/replace with
   */
  static fmt(format: string, value: number) {
    let pieceForValue;

    const pieces = format.split('|');
    if (pieces.length === 1) {
      pieceForValue = pieces[0];
    } else if (pieces.length === 2) {
      if (value === 1) {
        pieceForValue = pieces[0];
      } else {
        pieceForValue = pieces[1];
      }
    } else if (value === 0) {
      pieceForValue = pieces[0];
    } else if (value === 1) {
      pieceForValue = pieces[1];
    } else {
      pieceForValue = pieces[2];
    }

    const valueString = value.toString();
    return pieceForValue.replace('{}', valueString);
  }

  static regexLastIndexOf(s: string, regex: RegExp, startPos: number | null = null) {
    const sp = startPos !== null ? startPos : s.length;
    let re;
    if (regex.global) {
      re = regex;
    } else {
      let flags;
      // (this rigamarole is required to make Flow happy)
      if (regex.ignoreCase && regex.multiline) {
        flags = 'gim';
      } else if (regex.ignoreCase) {
        flags = 'gi';
      } else if (regex.multiline) {
        flags = 'gm';
      } else {
        flags = 'g';
      }
      re = new RegExp(regex.source, flags);
    }

    const stringToWorkWith = s.substring(0, sp + 1);
    let lastIndexOf = -1;
    let nextStop = 0;
    let result = 1;
    while (result !== null) {
      result = re.exec(stringToWorkWith);
      if (result !== null) {
        lastIndexOf = result.index;
        nextStop += 1;
        re.lastIndex = nextStop;
      }
    }
    return lastIndexOf;
  }

  static stripSimpleHtml(orig: string): string {
    const div = document.createElement('div');
    div.innerHTML = orig;
    const text = div.textContent || div.innerText || '';
    return text;
  }

  /**
   * Truncate the passed-in string so it is no longer than the number of
   * characters specified by maxLen. The truncation will happen at a word
   * boundary, if possible. Unless otherwise specified, an ellipsis
   * is appended to the resulting string.
   */
  static smartTruncate(orig: string, maxLen: number, ellipsis: boolean = true):string {
    if (orig.length < maxLen) {
      return orig;
    }
    // We check the first maxLen + 1 characters in case maxLen is the end of a word.
    const firstChunk = orig.substring(0, maxLen + 1);
    const lastWS = StringUtils.regexLastIndexOf(firstChunk, /\s/g);
    let result;
    if (lastWS >= 0) {
      // We found a whitespace character, so we'll break there.
      result = orig.substring(0, lastWS).trim();
    } else {
      result = orig.substring(0, maxLen).trim();
    }
    if (ellipsis) {
      result = `${result}…`;
    }
    return result;
  }

  /**
   * Split the string onto multiple lines, separated with the
   * given character, if the given limit is reached.
   */
  static wrapLabel(orig: string, newLine: string = '\n', limit: number = 50): string {
    const s = String(orig);
    if (s.length < limit) {
      return s;
    }
    const firstChunk = s.substring(0, limit);
    const lastWS = StringUtils.regexLastIndexOf(firstChunk, /\s/g);
    let firstLine;
    let remainder;
    if (lastWS >= 0) {
      // We found a whitespace character, so we'll break there.
      firstLine = s.substring(0, lastWS).trim();
      remainder = s.substring(lastWS).trim();
    } else {
      firstLine = firstChunk;
      remainder = s.substring(limit).trim();
    }
    if (remainder.length === 0) {
      // If the trimmed remainder is empty, then just return the part we found.
      return firstLine;
    }
    return `${firstLine}\n${StringUtils.wrapLabel(remainder, newLine, limit)}`;
  }

  /**
   * Returns true if the value is a string and it is has a length greater than 0.
   */
  static notEmpty(value: any): boolean {
    return value && (typeof value === 'string' || value instanceof String) && value.length > 0;
  }
}
