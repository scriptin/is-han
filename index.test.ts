import { describe, expect, it } from 'vitest';
import { isHan } from './index';

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
