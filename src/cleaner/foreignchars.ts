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

const clean = (text: string) =>
  removeSpecialCharacters(
    replaceWithPluralConsonants(removeForeignCharacters(text.toUpperCase()))
  );

export default clean;
