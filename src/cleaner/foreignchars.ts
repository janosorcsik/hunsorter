import {digraphs, trigraphs} from '../constant';
import {foreignChars} from '../mapping';

const pluralConsonants = [...trigraphs, ...digraphs].join('|');

// Clean special characters and replace ssz -> szsz
const cleanRegex = new RegExp(
  `(.)(?=\\1)(${pluralConsonants})| |-|\\[|\\]|\\.|\\(|\\)|`,
  'g'
);

const removeForeignCharacters = (text: string) => {
  let cleaned = '';

  for (const char of text) {
    cleaned += foreignChars[char] || char;
  }

  return cleaned;
};

const clean = (text: string) =>
  removeForeignCharacters(text.toUpperCase()).replace(cleanRegex, '$2$2');

export default clean;
