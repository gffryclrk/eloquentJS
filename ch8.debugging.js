function numberToString(n, base) {
	var result = "", sign = "";
	if (n < 0) {
		sign = "-";
		n = -n;
	}
	do {
		result = String(n % base) + result;
		// Author's bug
		// n /= base;
		n = Math.floor(n / base);
	} while (n >0);
	return sign + result;
}