import getIndex from './characterindex';
import cleanForeignChars from './cleaner/foreignchars';
import cleanAccent from './cleaner/accent';
import compareNumber from './comparer/number';
import compareText from './comparer/text';

const sorting = (a: string, b: string) => {
  let removeAccent = false;

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
    bIndex: 0
  });
};

export default sorting;
