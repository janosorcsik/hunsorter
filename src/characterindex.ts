import {accents} from './mapping';
import {abc} from './constant';

const getIndex = (char: string, removeAccent: boolean) =>
  abc.indexOf((removeAccent && accents[char]) || char);

export default getIndex;
