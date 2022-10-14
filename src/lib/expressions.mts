export const email = (value: string) => {
	return {
		base: new RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/),
		permitted: new RegExp(value, 'i'),
		restricted: new RegExp(value, 'i'),
	}
}

export const password = {
	hasNumber: new RegExp(/(?=(.*[0-9]))/),
	hasSpecialCharacter: new RegExp(/(?=.*[!@#$%^&*])/),
	hasUpperCase: new RegExp(/(?=.*[A-Z])/),
	hasLowerCase: new RegExp(/(?=.*[a-z])/),
}

export const array = (options: any, comparisonVal: any) => {
	let comparisonExp: any;
	if (options.ignoreCase && options.matchWholeWord) comparisonExp = new RegExp(`\\b${comparisonVal}\\b`, 'i');
	if (options.ignoreCase && !options.matchWholeWord) comparisonExp = new RegExp(comparisonVal, 'i');
	if (!options.ignoreCase && options.matchWholeWord) comparisonExp = new RegExp(`\\b${comparisonVal}\\b`);
	if (!options.ignoreCase && !options.matchWholeWord) comparisonExp = new RegExp(comparisonVal);
	return comparisonExp;
}

export const cases = {
	upper: new RegExp(/([A-Z])/g),
	lower: new RegExp(/([a-z])/g),
	camel: new RegExp(/(?:^\w|[A-Z]|\b\w)/g),
	pascal: new RegExp(/\w\S*/g),
	snake: new RegExp(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g),
	kebab: new RegExp(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g),
}