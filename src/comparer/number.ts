const compare = (i: number, j: number): number => {
	if (i < j) {
		return -1;
	}

	if (i > j) {
		return 1;
	}

	return 0;
};

export default compare;
