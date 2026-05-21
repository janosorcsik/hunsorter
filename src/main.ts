import { compareEqualTexts, compareNotEqualTexts } from './comparers';
import { normalizeAccent, normalizeText } from './normalizers';

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

	const cleanedA = normalizeText(a);
	const cleanedB = normalizeText(b);

	if (cleanedA === cleanedB) {
		return compareEqualTexts(a, b);
	}

	const ignoreAccent = normalizeAccent(cleanedA) !== normalizeAccent(cleanedB);

	return compareNotEqualTexts(cleanedA, cleanedB, ignoreAccent);
};

const isNullOrUndefined = (value: string | null | undefined) => {
	return value === null || typeof value === 'undefined';
};

export default sorting;
