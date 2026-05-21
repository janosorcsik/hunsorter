import { digraphs, trigraphs } from './constant';
import { accents, foreignChars } from './mapping';

const pluralConsonants = [...trigraphs, ...digraphs].join('|');

const removeSpecialCharacters = (text: string) =>
	text.replace(/[-\\ '`~!@#$%^&*()_|+=?;:",.<>{}[\]/]/g, '');

const replaceWithPluralConsonants = (text: string) =>
	text.replace(new RegExp(`(.)(?=\\1)(${pluralConsonants})`, 'g'), '$2$2');

const replaceForeignCharacters = (text: string) =>
	[...text].map((char) => foreignChars[char] ?? char).join('');

const normalizeAccent = (text: string) =>
	[...text].map((char) => accents[char] ?? char).join('');

const normalizeText = (text: string) =>
	removeSpecialCharacters(
		replaceWithPluralConsonants(replaceForeignCharacters(text.toUpperCase())),
	);

export { normalizeAccent, normalizeText };
