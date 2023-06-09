export type Range = [number] | [number, number];

export const HAN_RANGES: Range[] = [
  [0x4e00, 0x9fff], // CJK Unified Ideographs
  [0x3400, 0x4dbf], // CJK Unified Ideographs Extension A
  [0x20000, 0x2a6df], // CJK Unified Ideographs Extension B
  [0x2a700, 0x2b739], // CJK Unified Ideographs Extension C
  [0x2b740, 0x2b81d], // CJK Unified Ideographs Extension D
  [0x2b820, 0x2cea1], // CJK Unified Ideographs Extension E
  [0x2ceb0, 0x2ebe0], // CJK Unified Ideographs Extension F
  [0x30000, 0x3134a], // CJK Unified Ideographs Extension G
  [0x31350, 0x323af], // CJK Unified Ideographs Extension H
  [0x2e80, 0x2eff], // CJK Radicals Supplement
  [0x2f00, 0x2fdf], // Kangxi Radicals
  [0xf900, 0xfaff], // CJK Compatibility Ideographs
  [0x2f800, 0x2fa1f], // CJK Compatibility Ideographs Supplement
];

// 々 IDEOGRAPHIC ITERATION MARK
export const IDEOGRAPHIC_ITERATION_MARK_CODE_POINT = 0x3005;
export const IDEOGRAPHIC_ITERATION_MARK = String.fromCodePoint(
  IDEOGRAPHIC_ITERATION_MARK_CODE_POINT,
);

// 〆 IDEOGRAPHIC CLOSING MARK
export const IDEOGRAPHIC_CLOSING_MARK_CODE_POINT = 0x3006;
export const IDEOGRAPHIC_CLOSING_MARK = String.fromCodePoint(
  IDEOGRAPHIC_CLOSING_MARK_CODE_POINT,
);

export const HAN_EXT_RANGES: Range[] = [
  // CJK Symbols and Punctuation:
  [IDEOGRAPHIC_ITERATION_MARK_CODE_POINT],
  [IDEOGRAPHIC_CLOSING_MARK_CODE_POINT],

  // CJK Strokes:
  [0x31c0, 0x31ef],

  // Enclosed CJK Letters and Months:
  [0x3220, 0x3243], // parenthesized
  [0x3244, 0x3247], // circled
  [0x3280, 0x32b0], // circled
  [0x32c0, 0x32cb], // telegraph symbols for months
  [0x32ff], // square era name: REIWA

  // CJK Compatibility:
  [0x3358, 0x3370], // telegraph symbols for hours
  [0x337b, 0x337e], // square era names: HEISEI, SYOUWA, TAISYOU, MEIZI
  [0x337f], // square: CORPORATION
  [0x33e0, 0x33fe], // telegraph symbols for days (1st-31st)

  // Enclosed Ideographic Supplement:
  [0x1f210, 0x1f23b], // enclosed in squares
  [0x1f240, 0x1f248], // tortoise shell bracketed
  [0x1f250, 0x1f251], // circled
];

/**
 * Use with `String.@@iterator` or `Array.from` because they are Unicode-aware:
 *
 * ```js
 * for (let char of unicodeString) {
 *   console.log(isInRanges(char, ranges));
 * }
 * ```
 *
 * ```js
 * isInRanges(Array.from(unicodeString)[0], ranges));
 * ```
 */
function isInRanges(str: string, ranges: Range[]): boolean {
  const codePoint = str.codePointAt(0);
  if (codePoint == null) {
    throw new Error(`Expected a character at index 0, got ${codePoint}`);
  }
  for (const range of ranges) {
    if (range.length === 1 && codePoint === range[0]) return true;
    if (range.length === 2 && codePoint >= range[0] && codePoint <= range[1]) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a character is a Han script character: hanzi, kanji, hanja
 *
 * Input is expected to contain only 1 character, but note that a string can have length > 1
 * if a character is beyond basic multilingual plane (BMP) in Unicode, because JavaScript
 * uses UTF-16 and some Han characters do not fit in 16 bits.
 *
 * Use with `String.@@iterator` or `Array.from` because they are Unicode-aware:
 *
 * ```js
 * for (let char of unicodeString) {
 *   console.log(isHan(char, ranges));
 * }
 * ```
 *
 * ```js
 * isHan(Array.from(unicodeString)[0], ranges));
 * ```
 */
export function isHan(str: string): boolean {
  return isInRanges(str, HAN_RANGES);
}

/**
 * Checks if a character is an "extended" Han script character.
 * "Extended" means all Unicode characters which:
 *
 * - contain Han characters with additional wrappers, such as characters inside brackets, circles, etc.
 * - contain multiple "compacted" Han characters, such as Japanese "square era names", etc.
 * - contain parts of Han characters, such as CJK strokes
 * - 々 IDEOGRAPHIC ITERATION MARK - {@link isIterationMark}
 * - 〆 IDEOGRAPHIC CLOSING MARK - {@link isClosingMark}
 *
 * Input is expected to contain only 1 character, but note that a string can have length > 1
 * if a character is beyond basic multilingual plane (BMP) in Unicode, because JavaScript
 * uses UTF-16 and some Han characters do not fit in 16 bits.
 *
 * Use with `String.@@iterator` or `Array.from` because they are Unicode-aware:
 *
 * ```js
 * for (let char of unicodeString) {
 *   console.log(isHanExt(char, ranges));
 * }
 * ```
 *
 * ```js
 * isHanExt(Array.from(unicodeString)[0], ranges));
 * ```
 */
export function isHanExt(str: string): boolean {
  return isInRanges(str, HAN_EXT_RANGES);
}

/**
 * Checks if character is 々 IDEOGRAPHIC ITERATION MARK
 *
 * This mark means "repeat previous character"
 */
export function isIterationMark(str: string): boolean {
  return str === IDEOGRAPHIC_ITERATION_MARK;
}

/**
 * Checks if character is 〆 IDEOGRAPHIC CLOSING MARK
 */
export function isClosingMark(str: string): boolean {
  return str === IDEOGRAPHIC_CLOSING_MARK;
}
