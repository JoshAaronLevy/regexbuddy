export const email = {
	base: new RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/)
}

export const password = {
	hasNumber: new RegExp(/(?=(.*[0-9]))/),
	hasSpecialCharacter: new RegExp(/(?=.*[!@#$%^&*])/),
	hasUpperCase: new RegExp(/(?=.*[A-Z])/),
	hasLowerCase: new RegExp(/(?=.*[a-z])/),
}

export const array = (options, comparisonVal) => {
	let comparisonExp;
	if (options.ignoreCase && options.matchWholeWord) comparisonExp = new RegExp(`\\b${comparisonVal}\\b`, 'i');
	if (options.ignoreCase && !options.matchWholeWord) comparisonExp = new RegExp(comparisonVal, 'i');
	if (!options.ignoreCase && options.matchWholeWord) comparisonExp = new RegExp(`\\b${comparisonVal}\\b`);
	if (!options.ignoreCase && !options.matchWholeWord) comparisonExp = new RegExp(comparisonVal);
	return comparisonExp;
}