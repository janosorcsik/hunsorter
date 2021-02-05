import {digraphs, trigraphs} from '../constant';
import compareNumber from './number';
import getIndex from '../characterindex';

const getCharAndShift = (text: string, index: number) => {
  let shift = 3;
  let char = '';
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

  return {shift, char};
};

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
  bIndex
}: TextCompareData): number => {
  const {shift: aShift, char: aCurrentChar} = getCharAndShift(a, aIndex);

  const {shift: bShift, char: bCurrentChar} = getCharAndShift(b, bIndex);

  const aCharIndex = getIndex(aCurrentChar, removeAccent);
  const bCharIndex = getIndex(bCurrentChar, removeAccent);

  if (aCharIndex !== bCharIndex) {
    return compareNumber(aCharIndex, bCharIndex);
  }

  return compare({
    a,
    b,
    removeAccent,
    aIndex: aIndex + aShift,
    bIndex: bIndex + bShift
  });
};

export default compare;
