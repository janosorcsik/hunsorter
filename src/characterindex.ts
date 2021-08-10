import { abc } from './constant';
import { accents } from './mapping';

const getIndex = (char: string, removeAccent: boolean) =>
	abc.indexOf((removeAccent && accents[char]) || char);

export default getIndex;
