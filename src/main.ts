import cleanAccent from './cleaner/accent';
import cleanForeignChars from './cleaner/foreignchars';
import compareText from './comparer/text';
import { foreignChars } from './mapping';

const sorting = (
	a: string | undefined | null,
	b: string | undefined | null,
) => {
	if (isNullOrUndefined(a)) {
		return isNullOrUndefined(b) ? 0 : 1;
	}

	if (isNullOrUndefined(b)) {
		return -1;
	}

	const cleanedA = cleanForeignChars(a);
	const cleanedB = cleanForeignChars(b);

	if (cleanedA === cleanedB) {
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
	}

	const removeAccent = cleanAccent(cleanedA) !== cleanAccent(cleanedB);

	return compareText(cleanedA, cleanedB, removeAccent);
};

const isNullOrUndefined = (value: string | null | undefined) => {
	return value === null || typeof value === 'undefined';
};

export default sorting;
