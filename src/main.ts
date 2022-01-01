import getIndex from './characterindex';
import cleanAccent from './cleaner/accent';
import cleanForeignChars from './cleaner/foreignchars';
import compareNumber from './comparer/number';
import compareText from './comparer/text';

const sorting = (a?: string, b?: string) => {
	const aIsNullOrUndefined = isNullOrUndefined(a);
	const bIsNullOrUndefined = isNullOrUndefined(b);

	if (aIsNullOrUndefined && bIsNullOrUndefined) {
		return 0;
	}

	if (aIsNullOrUndefined) {
		return 1;
	}

	if (bIsNullOrUndefined) {
		return -1;
	}

	let removeAccent = false;
	a = a!;
	b = b!;

	const cleanedA = cleanForeignChars(a);
	const cleanedB = cleanForeignChars(b);

	if (cleanedA === cleanedB) {
		const aFirstChar = getIndex(a.charAt(0), removeAccent);
		const bFirstChar = getIndex(b.charAt(0), removeAccent);

		return compareNumber(aFirstChar, bFirstChar);
	}

	if (cleanAccent(cleanedA) !== cleanAccent(cleanedB)) {
		removeAccent = true;
	}

	return compareText({
		a: cleanedA,
		b: cleanedB,
		removeAccent,
		aIndex: 0,
		bIndex: 0,
	});
};

const isNullOrUndefined = (value: string | undefined | undefined) => {
	return value === null || typeof value === 'undefined';
};

export default sorting;
