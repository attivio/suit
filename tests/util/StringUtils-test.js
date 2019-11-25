import StringUtils from '../../src/util/StringUtils';

describe('Test StringUtils', () => {
  test('Can format strings properly', () => {
    expect(StringUtils.fmt('Hey', 5)).toEqual('Hey');
    expect(StringUtils.fmt('Mark {}', 5)).toEqual('Mark 5');
    expect(StringUtils.fmt('Zero thingies|One thingy|{} thingies', 0)).toEqual('Zero thingies');
    expect(StringUtils.fmt('Zero thingies|One thingy|{} thingies', 1)).toEqual('One thingy');
    expect(StringUtils.fmt('Zero thingies|One thingy|{} thingies', 2)).toEqual('2 thingies');
    expect(StringUtils.fmt('Zero thingies|One thingy|{} thingies', 17)).toEqual('17 thingies');
    expect(StringUtils.fmt('One thingy|{} thingies', 0)).toEqual('0 thingies');
    expect(StringUtils.fmt('One thingy|{} thingies', 1)).toEqual('One thingy');
    expect(StringUtils.fmt('One thingy|{} thingies', 17)).toEqual('17 thingies');
  });

  test('Can find the last index of a regex-matched string', () => {
    expect(StringUtils.regexLastIndexOf('Hello there, how are you?', /friend/)).toEqual(-1);
    expect(StringUtils.regexLastIndexOf('Hello there, how are you?', /\s/g)).toEqual(20);
  });

  test('Can strip simnple HTML tags out of a string', () => {
    const html = '<table class="infobox" style="width:22em"><caption style="font-size:130%; padding-bottom:0.15em;">HTML<br><span style="font-size:85%;"><span class="nowrap">(Hypertext Markup Language)</span></span></caption><tbody><tr><td colspan="2" style="text-align:center"><a href="/wiki/File:HTML5_logo_and_wordmark.svg" class="image"><img alt="HTML5 logo and wordmark.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/120px-HTML5_logo_and_wordmark.svg.png" width="120" height="120" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/180px-HTML5_logo_and_wordmark.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/240px-HTML5_logo_and_wordmark.svg.png 2x" data-file-width="512" data-file-height="512"></a><div>The official logo of the last version – <a href="/wiki/HTML5" title="HTML5">HTML5</a>.<sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[1]</a></sup></div></td></tr><tr><th scope="row" style="padding:0.2em 0;line-height:1.2em; padding-right:0.65em;"><a href="/wiki/Filename_extension" title="Filename extension">Filename extension</a></th><td style="line-height:1.35em;"><div class="plainlist"><ul><li><code>.html</code></li><li><code>.htm</code></li></ul></div></td></tr><tr><th scope="row" style="padding:0.2em 0;line-height:1.2em; padding-right:0.65em;"><a href="/wiki/Media_type" title="Media type">Internet media&nbsp;type</a></th><td style="line-height:1.35em;"><code>text/html'; // eslint-disable-line max-len
    const plain = 'HTML(Hypertext Markup Language)The official logo of the last version – HTML5.[1]Filename extension.html.htmInternet media\u00a0typetext/html'; // eslint-disable-line max-len
    expect(StringUtils.stripSimpleHtml(html)).toEqual(plain);
  });

  test('Can smartly truncate long strings', () => {
    const gettysburg = 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal'; // eslint-disable-line max-len
    expect(StringUtils.smartTruncate(gettysburg, 20)).toEqual('Four score and seven\u2026');
    expect(StringUtils.smartTruncate(gettysburg, 27, false)).toEqual('Four score and seven years');
  });

  test('Can wrap a long string into multiple lines', () => {
    const gettysburg = 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal'; // eslint-disable-line max-len
    const defaultWrapped = 'Four score and seven years ago our fathers brought\nforth on this continent, a new nation, conceived\nin Liberty, and dedicated to the proposition that\nall men are created equal'; // eslint-disable-line max-len
    const shortWrappedWindows = 'Four score and seven\r\nyears ago our\r\nfathers brought\r\nforth on this\r\ncontinent, a new\r\nnation, conceived in\r\nLiberty, and\r\ndedicated to the\r\nproposition that all\r\nmen are created\r\nequal'; // eslint-disable-line max-len

    expect(StringUtils.wrapLabel(gettysburg)).toEqual(defaultWrapped);
    expect(StringUtils.wrapLabel(gettysburg, '\r\n', 20)).toEqual(shortWrappedWindows);
  });

  test('Can find empty strings', () => {
    expect(StringUtils.notEmpty('I\'m full')).toBeTruthy();
    expect(StringUtils.notEmpty('')).toBeFalsy();
    expect(StringUtils.notEmpty(undefined)).toBeFalsy();
    expect(StringUtils.notEmpty(null)).toBeFalsy();
  });

  test('Can format numbers', () => {
    expect(StringUtils.formatNumber('2:${}', 3.2151)).toBe('$3.22');
    expect(StringUtils.formatNumber('4:None|{}% More|{}% More', 0)).toBe('None');
    expect(StringUtils.formatNumber('4:None|{}% More|{}% More', 1)).toBe('1.0000% More');
    expect(StringUtils.formatNumber('4:None|{}% More|{}% More', 72.324214566)).toBe('72.3242% More');
    expect(StringUtils.formatNumber('0:No Queries|{} Query|{} Queries', 0)).toBe('No Queries');
    expect(StringUtils.formatNumber('0:No Queries|{} Query|{} Queries', 1)).toBe('1 Query');
    expect(StringUtils.formatNumber('0:No Queries|{} Query|{} Queries', 72)).toBe('72 Queries');
    expect(StringUtils.formatNumber('0:1 Ringy-Dingy|{} Ringy-Dingies', 0)).toBe('0 Ringy-Dingies');
    expect(StringUtils.formatNumber('0:1 Ringy-Dingy|{} Ringy-Dingies', 1)).toBe('1 Ringy-Dingy');
    expect(StringUtils.formatNumber('0:1 Ringy-Dingy|{} Ringy-Dingies', 7)).toBe('7 Ringy-Dingies');
  });

  test('Can strip punctuation characters', () => {
    expect(StringUtils.stripPunctuation('and there are floating-point numbers like 123.582 and .0921 there'))
      .toEqual('and there are floating point numbers like 123.582 and .0921 there');
    expect(StringUtils.stripPunctuation('this period has punctuation.-after it'))
      .toEqual('this period has punctuation  after it');
    expect(StringUtils.stripPunctuation('sentence one. sentence two.'))
      .toEqual('sentence one  sentence two ');
  });

  test('Can coalesce whitespace', () => {
    expect(StringUtils.coalesceWhitespace('-this is some text 我们的车子是红 你们的车子是是 ： 中文 「毛 ？there are part numbers like BC-3-29 and like test@gmail.com & and     test2@gmail.com (  and there are floating-point numbers    like 123.582 and .0921 there')) // eslint-disable-line max-len
      .toEqual('-this is some text 我们的车子是红 你们的车子是是 ： 中文 「毛 ？there are part numbers like BC-3-29 and like test@gmail.com & and test2@gmail.com ( and there are floating-point numbers like 123.582 and .0921 there'); // eslint-disable-line max-len
  });

  test('Can detect punctuation', () => {
    expect(StringUtils.isPunctuation('.')).toBe(true);
    expect(StringUtils.isPunctuation(':')).toBe(true);
    expect(StringUtils.isPunctuation('(')).toBe(true);
    expect(StringUtils.isPunctuation('“')).toBe(true);
    expect(StringUtils.isPunctuation('。')).toBe(true);
    expect(StringUtils.isPunctuation('，')).toBe(true);
    expect(StringUtils.isPunctuation('…')).toBe(true);
    expect(StringUtils.isPunctuation('·')).toBe(true);
    expect(StringUtils.isPunctuation('《')).toBe(true);
    expect(StringUtils.isPunctuation('》')).toBe(true);
    expect(StringUtils.isPunctuation('「')).toBe(true);
    expect(StringUtils.isPunctuation('」')).toBe(true);
    expect(StringUtils.isPunctuation('『')).toBe(true);
    expect(StringUtils.isPunctuation('』')).toBe(true);
    expect(StringUtils.isPunctuation('【')).toBe(true);
    expect(StringUtils.isPunctuation('】')).toBe(true);
    expect(StringUtils.isPunctuation('、')).toBe(true);
    expect(StringUtils.isPunctuation('；')).toBe(true);
    expect(StringUtils.isPunctuation('？')).toBe(true);
    expect(StringUtils.isPunctuation('¿')).toBe(true);
    expect(StringUtils.isPunctuation('A')).toBe(false);
    expect(StringUtils.isPunctuation('7')).toBe(false);
    expect(StringUtils.isPunctuation('汉')).toBe(false);
    expect(StringUtils.isPunctuation('א')).toBe(false);
  });

  test('Can detect whitespace', () => {
    expect(StringUtils.isWhitespace('.')).toBe(false);
    expect(StringUtils.isWhitespace(' ')).toBe(true);
    expect(StringUtils.isWhitespace('\t')).toBe(true);
    expect(StringUtils.isWhitespace(' ')).toBe(true);
  });

  test('Can find hyphens with numbers around them', () => {
    const bad = 'and there are floating-point numbers like 123.582 and .0921 there';
    const good = 'like BC-3-29 and like';
    expect(bad.substring(22, 23)).toEqual('-');
    expect(StringUtils.isNumericOnlyAfter(bad, 22)).toBe(false);
    expect(StringUtils.isNumericOnlyBefore(bad, 22)).toBe(false);
    expect(StringUtils.isNumericOnlyAfter(good, 7)).toBe(true);
    expect(StringUtils.isNumericOnlyBefore(good, 7)).toBe(false);
    expect(StringUtils.isNumericOnlyAfter(good, 9)).toBe(true);
    expect(StringUtils.isNumericOnlyBefore(good, 9)).toBe(true);
  });

  test('Can normalize autocomplete strings', () => {
    expect(StringUtils.normalizeAutocompleteSuggestion('    ')).toEqual('');
    expect(StringUtils.normalizeAutocompleteSuggestion('foo')).toEqual('foo');
    expect(StringUtils.normalizeAutocompleteSuggestion('foo lvaldez@attivio.com')).toEqual('foo lvaldez@attivio.com');
    expect(StringUtils.normalizeAutocompleteSuggestion('question?')).toEqual('question');
    expect(StringUtils.normalizeAutocompleteSuggestion('part A-432-5-B')).toEqual('part A-432-5-B');
    expect(StringUtils.normalizeAutocompleteSuggestion('192.424')).toEqual('192.424');
    expect(StringUtils.normalizeAutocompleteSuggestion('.1234')).toEqual('.1234');
    expect(StringUtils.normalizeAutocompleteSuggestion('why is my bank balance 723.28?')).toEqual('why is my bank balance 723.28');
    expect(StringUtils.normalizeAutocompleteSuggestion('    this is some text—我们的车子是红。你们的车子是是…：【中文】「毛」？there are part numbers like BC-3-29 and like test@gmail.com&& and     test2@gmail.com((& and there are floating-point numbers    like 123.582 and .0921 there   ')) // eslint-disable-line max-len
      .toEqual('this is some text 我们的车子是红 你们的车子是是 中文 毛 there are part numbers like BC-3-29 and like test@gmail.com and test2@gmail.com and there are floating point numbers like 123.582 and .0921 there'); // eslint-disable-line max-len
  });

  test('Can normalize autocomplete strings', () => {
    expect(StringUtils.stripQuestionMarks('How you doin\'?')).toEqual('How you doin\' ');
    expect(StringUtils.stripQuestionMarks('What? When? Where? Why? How?')).toEqual('What  When  Where  Why  How ');
  });
});
