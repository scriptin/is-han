import { describe, expect, it } from 'vitest';
import { isClosingMark, isHan, isHanExt, isIterationMark } from './index';

describe('isHan', () => {
  it('matches BMP Han characters', () => {
    expect(isHan('漢')).toBeTruthy();
  });

  it('matches SIP Han characters', () => {
    expect(isHan('\u{20000}')).toBeTruthy();
  });

  it('matches TIP Han characters', () => {
    expect(isHan('\u{30000}')).toBeTruthy();
  });

  it.each(['语', '习', '长', '门', '见'])(
    'matches simplified Chinese characters, such as %s',
    (c) => {
      expect(isHan(c)).toBeTruthy();
    },
  );

  it.each(['a', 'щ', 'ω', 'हि'])(
    'does not match characters from non-Han scripts, such as %s',
    (c) => {
      expect(isHan(c)).toBeFalsy();
    },
  );
});

describe('isHanExtended', () => {
  it.each(['々', '〆'])('matches ideographic mark symbol %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });

  // sample, not exhaustive
  it.each(Array.from('㇀㇁㇂㇃㇄㇅㇆㇇㇈㇉㇊㇋㇌㇍㇎㇏'))(
    'matches CJK stroke %s',
    (c) => {
      expect(isHanExt(c)).toBeTruthy();
    },
  );

  it.each(
    Array.from(
      '㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩㈪㈫㈬㈭㈮㈯㈰㈱㈲㈳㈴㈵㈶㈷㈸㈹㈺㈻㈼㈽㈾㈿㉀㉁㉂㉃',
    ),
  )('matches "paranthesized" character %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });

  it.each(
    Array.from(
      '㉄㉅㉆㉇㊀㊁㊂㊃㊄㊅㊆㊇㊈㊉㊊㊋㊌㊍㊎㊏㊐㊑㊒㊓㊔㊕㊖㊗㊘㊙㊚㊛㊜㊝㊞㊟㊠㊡㊢㊣㊤㊥㊦㊧㊨㊩㊪㊫㊬㊭㊮㊯㊰',
    ),
  )('matches "circled" character %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });

  it.each(Array.from('㋀㋁㋂㋃㋄㋅㋆㋇㋈㋉㋊㋋'))(
    'matches month character %s',
    (c) => {
      expect(isHanExt(c)).toBeTruthy();
    },
  );

  it.each(
    Array.from(
      '㏠㏡㏢㏣㏤㏥㏦㏧㏨㏩㏪㏫㏬㏭㏮㏯㏰㏱㏲㏳㏴㏵㏶㏷㏸㏹㏺㏻㏼㏽㏾',
    ),
  )('matches day of month character %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });

  it.each(Array.from('㍘㍙㍚㍛㍜㍝㍞㍟㍠㍡㍢㍣㍤㍥㍦㍧㍨㍩㍪㍫㍬㍭㍮㍯㍰'))(
    'matches hour character %s',
    (c) => {
      expect(isHanExt(c)).toBeTruthy();
    },
  );

  it.each(Array.from('㋿㍻㍼㍽㍾㍿'))(
    'matches "compressed" character %s',
    (c) => {
      expect(isHanExt(c)).toBeTruthy();
    },
  );

  it.each(
    Array.from(
      '🈐🈑🈒🈓🈔🈕🈖🈗🈘🈙🈚🈛🈜🈝🈞🈟🈠🈡🈢🈣🈤🈥🈦🈧🈨🈩🈪🈫🈬🈭🈮🈯🈰🈱🈲🈳🈴🈵🈶🈷🈸🈹🈺🈻',
    ),
  )('matches "squared" character %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });

  it.each(Array.from('🉀🉁🉂🉃🉄🉅🉆🉇🉈'))(
    'matches "bracketed" character %s',
    (c) => {
      expect(isHanExt(c)).toBeTruthy();
    },
  );

  it.each(Array.from('🉐🉑'))('matches "circled" character %s', (c) => {
    expect(isHanExt(c)).toBeTruthy();
  });
});

describe('isIterationMark', () => {
  it('matches 々 IDEOGRAPHIC ITERATION MARK', () => {
    expect(isIterationMark('々')).toBeTruthy();
  });
});

describe('isIterationMark', () => {
  it('matches 〆 IDEOGRAPHIC CLOSING MARK', () => {
    expect(isClosingMark('〆')).toBeTruthy();
  });
});
