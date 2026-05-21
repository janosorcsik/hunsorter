import getIndex from '../characterindex';
import { digraphs, trigraphs } from '../constant';
import compareNumber from './number';

const getCharAndShift = (text: string, index: number) => {
	let number = Number.parseInt(text[index]!, 10);
	const isNumber = !Number.isNaN(number);
	let char = '';
	let shift = 1;

	if (isNumber) {
		for (let i = index + 1; i < text.length; i++) {
			if (Number.isNaN(Number.parseInt(text[i]!, 10))) {
				break;
			}

			shift += 1;
		}

		const slicedText = text.slice(index, index + shift);
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

const compare = (a: string, b: string, removeAccent: boolean): number => {
	let aIndex = 0;
	let bIndex = 0;

	while (aIndex < a.length || bIndex < b.length) {
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

		// Make sure numbers come before letters
		if (aIsNumber !== bIsNumber) {
			return compareNumber(Number(!aIsNumber), Number(!bIsNumber));
		}

		const aCharIndex = aIsNumber
			? aNumber
			: getIndex(aCurrentChar, removeAccent);
		const bCharIndex = bIsNumber
			? bNumber
			: getIndex(bCurrentChar, removeAccent);

		if (aCharIndex !== bCharIndex) {
			return compareNumber(aCharIndex, bCharIndex);
		}

		if (aIsNumber && aShift !== bShift) {
			return compareNumber(aShift, bShift);
		}

		aIndex += aShift;
		bIndex += bShift;
	}

	return 0;
};

export default compare;
