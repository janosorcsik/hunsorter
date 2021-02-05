import {accents} from '../mapping';

const clean = (text: string) => {
  let cleaned = '';

  for (const char of text) {
    cleaned += accents[char] || char;
  }

  return cleaned;
};

export default clean;
