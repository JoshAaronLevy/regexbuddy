import IPassword from '../interfaces/password.interface';
import IEmail from '../interfaces/email.interface';
import IArray from '../interfaces/array.interface';
import ICase from '../interfaces/case.interface';

export const passwordOptions = (
	options: IPassword.Options
): IPassword.Options => {
	return {
		minLength: options.minLength ?? 5,
		requireNumber: options.requireNumber ?? true,
		requireSpecialCharacter: options.requireSpecialCharacter ?? true,
		requireUpperCase: options.requireUpperCase ?? true,
		requireLowerCase: options.requireLowerCase ?? true,
	};
};

export const passwordExpressions = {
	hasNumber: /(?=(.*[0-9]))/,
	hasSpecialCharacter: /(?=.*[!@#$%^&*])/,
	hasUpperCase: /(?=.*[A-Z])/,
	hasLowerCase: /(?=.*[a-z])/,
};

export const emailOptions = (
	options: Partial<IEmail.Options>
): IEmail.Options => {
	return {
		permitted: options.permitted || null,
		restricted: options.restricted || null,
	};
};

export const emailExpressions = (value: string): IEmail.Expressions => {
	return {
		base: new RegExp(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/),
		permitted: new RegExp(value, 'i'),
		restricted: new RegExp(value, 'i'),
	};
};

export const caseExpressions: ICase.Expressions = {
	upper: new RegExp(/([A-Z])/g),
	lower: new RegExp(/([a-z])/g),
	camel: new RegExp(/(?:^\w|[A-Z]|\b\w)/g),
	pascal: new RegExp(/\w\S*/g),
	snake: new RegExp(
		/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
	),
	kebab: new RegExp(
		/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
	),
};

export const arrayExpressions = (
	options: IArray.Options,
	comparisonVal: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
	if (options.ignoreCase && options.matchWholeWord)
		return new RegExp(`\\b${comparisonVal}\\b`, 'i');
	if (options.ignoreCase && !options.matchWholeWord)
		return new RegExp(comparisonVal, 'i');
	if (!options.ignoreCase && options.matchWholeWord)
		return new RegExp(`\\b${comparisonVal}\\b`);
	if (!options.ignoreCase && !options.matchWholeWord)
		return new RegExp(comparisonVal);
};

export const arrayOptions = (options: IArray.Options): IArray.Options => {
	return {
		key: options.key ?? undefined,
		value: options.value ?? undefined,
		ignoreCase: options.ignoreCase ?? false,
		matchWholeWord: options.matchWholeWord ?? true,
	};
};
