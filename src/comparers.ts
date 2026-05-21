import { abc, digraphs, trigraphs } from './constant';
import { accents, foreignChars } from './mapping';

const abcIndex = new Map(abc.map((letter, i) => [letter, i]));

const getIndex = (char: string, ignoreAccent: boolean) =>
	abcIndex.get((ignoreAccent ? accents[char] : char) ?? char) ?? -1;

const compareNumbers = (i: number, j: number): number => Math.sign(i - j);

const getCharAndShift = (text: string, index: number) => {
	let number = Number.parseInt(text.charAt(index), 10);
	const isNumber = !Number.isNaN(number);
	let char = '';
	let shift = 1;

	if (isNumber) {
		let end = index + 1;

		while (
			end < text.length &&
			!Number.isNaN(Number.parseInt(text.charAt(end), 10))
		) {
			end++;
		}

		const slicedText = text.slice(index, end);
		shift = slicedText.length;
		number = Number.parseInt(slicedText, 10);
	} else {
		shift = 3;
		let slicedText = text.slice(index, index + shift);

		if (trigraphs.includes(slicedText)) {
			char = slicedText;
		} else {
			shift = 2;
			slicedText = text.slice(index, index + shift);

			if (digraphs.includes(slicedText)) {
				char = slicedText;
			} else {
				shift = 1;
				char = text.charAt(index);
			}
		}
	}

	return {
		shift,
		char,
		number,
		isNumber,
	};
};

const compareNotEqualTexts = (
	a: string,
	b: string,
	ignoreAccent: boolean,
): number => {
	let aIndex = 0;
	let bIndex = 0;

	while (aIndex < a.length && bIndex < b.length) {
		const {
			shift: aShift,
			char: aCurrentChar,
			number: aNumber,
			isNumber: aIsNumber,
		} = getCharAndShift(a, aIndex);

		const {
			shift: bShift,
			char: bCurrentChar,
			number: bNumber,
			isNumber: bIsNumber,
		} = getCharAndShift(b, bIndex);

		// Numbers sort before letters (not mandated by the rules, but consistent with §14 examples).
		if (aIsNumber !== bIsNumber) {
			return compareNumbers(Number(!aIsNumber), Number(!bIsNumber));
		}

		const aCharIndex = aIsNumber
			? aNumber
			: getIndex(aCurrentChar, ignoreAccent);
		const bCharIndex = bIsNumber
			? bNumber
			: getIndex(bCurrentChar, ignoreAccent);

		if (aCharIndex !== bCharIndex) {
			return compareNumbers(aCharIndex, bCharIndex);
		}

		// Same numeric value but different digit counts (e.g. '07' vs '7'): fewer digits sorts first.
		if (aIsNumber && aShift !== bShift) {
			return compareNumbers(aShift, bShift);
		}

		aIndex += aShift;
		bIndex += bShift;
	}

	if (aIndex >= a.length && bIndex >= b.length) {
		return 0;
	}

	return aIndex >= a.length ? -1 : 1;
};

const compareEqualTexts = (a: string, b: string): number => {
	const aUpper = a.toUpperCase();
	const bUpper = b.toUpperCase();
	const len = Math.min(a.length, b.length);

	for (let i = 0; i < len; i++) {
		const aIsForeign = aUpper.charAt(i) in foreignChars;
		const bIsForeign = bUpper.charAt(i) in foreignChars;

		if (aIsForeign !== bIsForeign) {
			return aIsForeign ? 1 : -1;
		}
	}

	const aFirstIsUpper = a.charAt(0) === aUpper.charAt(0);
	const bFirstIsUpper = b.charAt(0) === bUpper.charAt(0);

	if (aFirstIsUpper !== bFirstIsUpper) {
		return aFirstIsUpper ? 1 : -1;
	}

	return 0;
};

export { compareNotEqualTexts, compareEqualTexts };
