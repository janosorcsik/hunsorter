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

	return { shift, char, number, isNumber };
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface TextCompareData {
	a: string;
	b: string;
	removeAccent: boolean;
	aIndex: number;
	bIndex: number;
}

const compare = ({
	a,
	b,
	removeAccent,
	aIndex,
	bIndex,
}: TextCompareData): number => {
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

	const aCharIndex = aIsNumber ? aNumber : getIndex(aCurrentChar, removeAccent);
	const bCharIndex = bIsNumber ? bNumber : getIndex(bCurrentChar, removeAccent);

	if (aCharIndex !== bCharIndex) {
		return compareNumber(aCharIndex, bCharIndex);
	}

	return compare({
		a,
		b,
		removeAccent,
		aIndex: aIndex + aShift,
		bIndex: bIndex + bShift,
	});
};

export default compare;
