# is-han

Unicode-aware Han characters (hanzi, kanji, hanja) detection

```shell
npm i @scriptin/is-han
```

## Usage

> **Note** You need to use Unicode-aware methods/operators in JavaScript -
> `Array.from(str)` and `for/of` loops -
> in order to process all Han characters. Some of them have code points
> which don't fit into 16 bits, and JavaScript uses UTF-16.

Examples of correct usage:

```js
import { isHan } from "@scriptin/is-han";

for (const char of "漢字") {
  console.log(isHan(char));
}

// or

Array.from("漢字").filter(isHan)
```

Incorrect usage:

```js
'𠀋'.split('').filter(isHan); // -> empty array
// because code point of '𠀋' is '2000B' which is more than 16 bit long,
// so it is split into a surrogate pair
console.log('𠀋'.split('')); // -> ['\uD840', '\uDC0B']

// Compare to:
console.log(Array.from('𠀋')); // -> ['𠀋']
```

## API

- `isHan(char: string): boolean` - Checks if a character is a Han script character: hanzi, kanji, hanja

- `isHanExt(char: string): boolean` - Checks if a character is an "extended" Han script character.
  Useful when you're looking for obscure characters which contain Han script,
  e.g. symbols like 🈲, 🈯, 🈳, 🉐, 🉑, ㊄, ㋋, ㏾, ㍰,
  "Extended" means all Unicode characters which:

  - contain Han characters with additional wrappers, such as symbols inside brackets, circles, etc.
  - contain multiple "compacted" Han characters, such as Japanese "square era names", etc.
  - contain parts of Han characters, such as CJK strokes
  - 々 IDEOGRAPHIC ITERATION MARK (see below)
  - 〆 IDEOGRAPHIC CLOSING MARK (see below)

- `isIterationMark(char: string): boolean` - Checks if character is 々 IDEOGRAPHIC ITERATION MARK.
  This mark means "repeat previous character". Can be useful if you want to replace this mark with
  the character it repeats/represents.
  See [Wiktionary article about 々](https://en.wiktionary.org/wiki/%E3%80%85)

- `isClosingMark(char: string): boolean` - Checks if character is 〆 IDEOGRAPHIC CLOSING MARK.
  This mark is used in place of another Han character.
  See [Wiktionary article about 〆](https://en.wiktionary.org/wiki/%E3%80%86)

- Some constants are also exported in case you need to extend the functionality.

# FAQ

#### ❓ Why do I have to use `Array.from(str)` and `for/of`?

Because JavaScript (and TypeScript) use UTF-18 for strings, and some of more recent
additions into Unicode don't fit into 16 bit. In such cases, characters are represented
with [surrogates](https://en.wikipedia.org/wiki/Universal_Character_Set_characters#Surrogates).
`Array.from()` and `for/of` were added in more recent versions of ECMAScript and were made Unicode-aware.

This library cannot change this JavaScript feature, so you have to use these two methods,
and avoid using `Array.split()`, `String.codePointAt()`, `String.charCodeAt()`, etc.

#### ❓ Can I detect language (Chinese/Japanese/Korean) for a given Han character?

No, because of [Han unification](https://en.wikipedia.org/wiki/Han_unification)
most of CJK characters are represented with shared code points.
Each code point can be associated with multiple versions/variants of the same character,
including regional, stylistic, and other variations. In order to determine a language,
you need to know some context. For example, language can be set as an attribute
of a web page or a PDF document, or as a setting in an operating system.

This library doesn't provide methods to distinguish between languages.

#### ❓ Can I distinguish between Traditional and Simplified Chinese characters?

In some cases, yes. In others, traditional and simplified variants
share same code points. See [this article](https://r12a.github.io/scripts/chinese/).
For a sufficiently big text, you can determine if it's traditional or simplified
by looking for specific code points.

This library doesn't provide methods to distinguish between traditional and simplified scripts.
