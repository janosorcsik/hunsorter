import getIndex from './characterindex';
import cleanAccent from './cleaner/accent';
import cleanForeignChars from './cleaner/foreignchars';
import compareNumber from './comparer/number';
import compareText from './comparer/text';

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
		const aFirstChar = getIndex(a.charAt(0), false);
		const bFirstChar = getIndex(b.charAt(0), false);

		return compareNumber(aFirstChar, bFirstChar);
	}

	const removeAccent = cleanAccent(cleanedA) !== cleanAccent(cleanedB);

	return compareText(cleanedA, cleanedB, removeAccent);
};

const isNullOrUndefined = (value: string | null | undefined) => {
	return value === null || typeof value === 'undefined';
};

export default sorting;
