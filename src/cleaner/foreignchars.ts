import {digraphs, trigraphs} from '../constant';
import {foreignChars} from '../mapping';

const pluralConsonants = [...trigraphs, ...digraphs].join('|');

const removeSpecialCharacters = (text: string) =>
  text.replace(/[ \-'`~!@#$%^&*()_|+=?;:",.<>{}[\]\\/]/g, '');

const replaceWithPluralConsonants = (text: string) =>
  text.replace(new RegExp(`(.)(?=\\1)(${pluralConsonants})`, 'g'), '$2$2');

const removeForeignCharacters = (text: string) => {
  let cleaned = '';

  for (const char of text) {
    cleaned += foreignChars[char] || char;
  }

  return cleaned;
};

const cache = {};

const clean = (text: string) => {
  const cachedValue = cache[text];

  if (cachedValue !== undefined) {
    return cachedValue;
  }

  const result = removeSpecialCharacters(
    replaceWithPluralConsonants(removeForeignCharacters(text.toUpperCase()))
  );

  cache[text] = result;

  return result;
};

export default clean;
