import { expect, test } from 'vitest';
import sorting from '../src/main';

test('Sorting strings that contain numbers', () => {
	const array = [
		'0',
		'1. c.',
		' 8.a osztály',
		'9. b. IV. csoport',
		'9. b. V. csoport',
		'9/c 2. csoport',
		'11',
		'12. szak',
		'a',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14a: Words starting with different letters are ordered by the alphabetical position of the first letter.', () => {
	const array = [
		'acél',
		'cukor',
		'csók',
		'dzsungel',
		'gép',
		'hideg',
		'kettő',
		'Nagy',
		'nyúl',
		'olasz',
		'öröm',
		'remény',
		'sokáig',
		'szabad',
		'Tamás',
		'vásárol',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14a: Case is ignored for ordering, but when two entries differ only in case, lowercase comes before uppercase.', () => {
	const array = [
		'dzsihád',
		'Dzsihád',
		'jácint',
		'Jácint',
		'opera',
		'Opera',
		'szűcs',
		'Szűcs',
		'viola',
		'Viola',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14a: A single-letter character is always sorted before a digraph or trigraph that starts with the same character.', () => {
	const array = [
		'cudar',
		'cukor',
		'cuppant',
		'csalit',
		'csata',
		'Csepel',
		'Zoltán',
		'zongora',
		'zúdul',
		'zsalu',
		'zseni',
		'Zsigmond',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14b: When words share a common prefix, ordering is determined by the first differing letter.', () => {
	const array = [
		'lom',
		'lomb',
		'lombik',
		'Lontay',
		'lovagol',
		'pirinkó',
		'pirinyó',
		'pirít',
		'pirkad',
		'Piroska',
		'tükör',
		'Tünde',
		'tünemény',
		'tüntet',
		'tüzér',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test(`§14b: Single letters are always sorted before digraphs/trigraphs starting with the same character, even within a word.
  Doubled single letters count as two separate letters (bb = b + b, rr = r + r, etc.).
  Doubled multi-letter consonants are always split into their components (ccs = cs + cs, ggy = gy + gy, ddzs = dzs + dzs, etc.).`, () => {
	const array = [
		'kas',
		'Kasmír',
		'Kassák',
		'kastély',
		'kasza',
		'kaszinó',
		'kassza',
		'kaszt',
		'mennek',
		'mennének',
		'menü',
		'menza',
		'meny',
		'Menyhért',
		'mennybolt',
		'mennyi',
		'nagy',
		'naggyá',
		'nagygyakorlat',
		'naggyal',
		'nagyít',
		'nagyobb',
		'nagyol',
		'nagyoll',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14c: Short and long vowel pairs (a–á, e–é, i–í, o–ó, ö–ő, u–ú, ü–ű) are treated as equal when other letters differ, so a word with a long vowel may sort before one with the corresponding short vowel.', () => {
	const array = [
		'ír',
		'Irak',
		'iram',
		'Irán',
		'írandó',
		'iránt',
		'író',
		'iroda',
		'irónia',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14c: When two words differ only in vowel length, the short-vowel word sorts before the long-vowel word.', () => {
	const array = [
		'Eger',
		'egér',
		'egyfelé',
		'egyféle',
		'elöl',
		'elől',
		'kerek',
		'kerék',
		'keres',
		'kérés',
		'koros',
		'kóros',
		'szel',
		'szél',
		'szeles',
		'széles',
		'szüret',
		'szűret',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§14d: Spaces, hyphens and word boundaries are ignored; compounds, phrases and proper nouns are sorted as if written as a single word.', () => {
	const array = [
		'kis részben',
		'kissé',
		'Kiss Ernő',
		'kis sorozat',
		'kissorozat-gyártás',
		'kis számban',
		'kistányér',
		'kis virág',
		'márvány',
		'márványkő',
		'márvány sírkő',
		'Márvány-tenger',
		'márványtömb',
		'Márvány Zsolt',
		'másféle',
		'másol',
		'tiszafa',
		'Tiszahát',
		'Tisza Kálmán',
		'Tisza menti',
		'Tiszántúl',
		'Tisza-part',
		'tiszavirág',
		'tiszt',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test(`§15: Foreign and archaic letters are handled specially.
  Digraphs in archaic Hungarian surnames and foreign letter combinations are split into their components (ch = c + h, cz = c + z, sch = s + c + h, etc.).
  Foreign letters that differ from a Hungarian letter only by a diacritic are not treated as independent letters.
  A foreign diacritic is only considered when it is the sole difference between two words; in that case the word with the foreign diacritic sorts last.`, () => {
	const array = [
		'cérna',
		'Černý',
		'Champagne',
		'Cholnoky',
		'címez',
		'cukor',
		'Czuczor',
		'csapat',
		'Ðan',
		'ǅupiter',
		'Gaal',
		'galamb',
		'Gärtner',
		'gáz',
		'geodézia',
		'Georges',
		'góc',
		'Goethe',
		'Łódź',
		'moshat',
		'mosna',
		'Mošna',
		'mosópor',
		'Møsstrand',
		'mostan',
		'munka',
		'Muñoz',
		'Þór',
		'Žaba',
	];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('Null and undefined values are sorted to the end', () => {
	const array = ['alma', 'Béla', 'cékla', null, undefined];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('Numbers with equal value but different digit counts are sorted by digit count', () => {
	const array = ['0', '00', '000', '0000'];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('Strings containing unknown characters are sorted with the plain string first', () => {
	const array = ['alma', 'alma🍎'];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

test('§15: A word with a foreign diacritic sorts after the plain equivalent when that is the only difference', () => {
	const array = ['mosna', 'mošna'];

	const shuffled = shuffle(array);
	const sorted = shuffled.sort(sorting);

	expect(sorted).toEqual(array);
});

const shuffle = <T>(array: T[]) => {
	const copy = [...array];

	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		const tmp = copy[j];
		copy[j] = copy[i];
		copy[i] = tmp;
	}

	return copy;
};
