/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import IPassword from '../interfaces/password.interface';
import IEmail from '../interfaces/email.interface';
import ICase from '../interfaces/case.interface';
import IArray from '../interfaces/array.interface';
import { passwordOptions, passwordExpressions, emailOptions, emailExpressions, caseExpressions, arrayOptions, arrayExpressions } from '../lib/constants';

interface IRenderError {
	valid: boolean;
	message: string;
}

const renderError = (errorMsg: string): IRenderError => {
	return {
		valid: false,
		message: `regexbuddy: ${errorMsg}`,
	};
};

const validatePassword = (
	password: string,
	options: IPassword.Options
): IPassword.ValidationResult | IRenderError => {
	const invalidCriteria: string[] = [];
	if (!password || password === undefined)
		return renderError('No password provided');
	if (password.length < options.minLength!)
		invalidCriteria.push(
			`Has a minimum of ${options.minLength} characters`
		);
	if (options.requireNumber! && !passwordExpressions.hasNumber.test(password))
		invalidCriteria.push('Contains at least one number');
	if (
		options.requireSpecialCharacter! &&
		!passwordExpressions.hasSpecialCharacter.test(password)
	)
		invalidCriteria.push('Contains at least one special character');
	if (
		options.requireUpperCase! &&
		!passwordExpressions.hasUpperCase.test(password)
	)
		invalidCriteria.push('Contains at least one uppercase letter');
	if (
		options.requireLowerCase! &&
		!passwordExpressions.hasLowerCase.test(password)
	)
		invalidCriteria.push('Contains at least one lowercase letter');
	if (invalidCriteria.length > 0) {
		return {
			valid: false,
			errors: invalidCriteria,
		};
	} else {
		return {
			valid: true,
			errors: null,
		};
	}
};

const matchPassword = (password1: string, password2: string): boolean =>
	new RegExp(`^${password1}$`).test(password2);

const validateEmail = (
	emailAddress: string,
	options: IEmail.Options
): { valid: boolean; message: string | null } => {
	let emailValid = false;
	let message = '';

	if (!emailAddress || emailAddress === undefined) {
		message = 'No email address provided';
	}

	if (typeof emailAddress !== 'string') {
		message = `Invalid input type for email. Expected a string, but got ${typeof emailAddress}`;
	}

	if (!emailExpressions('').base.test(emailAddress)) {
		message = `Invalid email address: ${emailAddress}`;
	}

	if (!options.permitted && !options.restricted) {
		emailValid = emailExpressions('').base.test(emailAddress);
	} else {
		if (emailExpressions('').base.test(emailAddress)) {
			const permittedEmails = options.permitted?.join(', ') || null;
			const restrictedEmails = options.restricted?.join(', ') || null;
			if (options.restricted) {
				const emailCheck = options.restricted
					.map((value) =>
						emailExpressions(value).restricted.test(emailAddress)
					)
					.filter((value) => value === true);
				if (emailCheck.length === 0) {
					emailValid = true;
				} else {
					if (options.permitted) {
						message = `${restrictedEmails} email addresses cannot be used. Only ${permittedEmails} email addresses are permitted.`;
					} else {
						message = `${restrictedEmails} email addresses cannot be used.`;
					}
				}
			} else if (options.permitted) {
				const emailCheck = options.permitted
					.map((value) =>
						emailExpressions(value).permitted.test(emailAddress)
					)
					.filter((value) => value === true);
				emailCheck.length > 0
					? (emailValid = true)
					: (message = `Only ${permittedEmails} email addresses are permitted.`);
			}
		}
	}

	return {
		valid: emailValid,
		message: emailValid ? null : message,
	};
};

const findArrayDupes = (
	leftArray: Array<any>,
	comparisonVal: string,
	options: IArray.Options
) => {
	let result = {};
	const scrubbedSet = new Set(
		leftArray.filter((item, index) => leftArray.indexOf(item) === index)
	);
	if (comparisonVal && comparisonVal !== '') {
		const duplicateVals = leftArray.filter((item) =>
			arrayExpressions(options, comparisonVal).test(item)
		);
		let uniqueVals: Array<[]>;
		if (duplicateVals.length > 0) {
			uniqueVals = duplicateVals.map((item) =>
				leftArray.filter((val) => val !== item)
			)[0];
		} else {
			uniqueVals = leftArray;
		}
		result = {
			duplicateList: duplicateVals,
			uniqueList: uniqueVals,
			scrubbedList: [...scrubbedSet],
			duplicateCount: duplicateVals?.length || 0,
			uniqueCount: uniqueVals?.length || 0,
		};
	} else {
		const duplicateVals = leftArray.filter(
			(item, index) => leftArray.indexOf(item) !== index
		);
		let uniqueVals: string | any[];
		if (duplicateVals.length > 0) {
			uniqueVals = duplicateVals.map((item) =>
				leftArray.filter((val) => val !== item)
			)[0];
		} else {
			uniqueVals = leftArray;
		}
		result = {
			duplicateList: duplicateVals,
			uniqueList: uniqueVals,
			scrubbedList: [...scrubbedSet],
			duplicateCount: duplicateVals?.length || 0,
			uniqueCount: uniqueVals?.length || 0,
		};
	}
	return result;
};

const camelCase = (str: string): string =>
	str
		.replace(caseExpressions.camel, (word, index) =>
			index == 0 ? word.toLowerCase() : word.toUpperCase()
		)
		.replace(/\s+/g, '');

const snakeCase = (str: string | any): string =>
	str
		.match(caseExpressions.snake)
		.map((word) => word.toLowerCase())
		.join('_');

const kebabCase = (str: string | any): string =>
	str
		.match(caseExpressions.kebab)
		.map((word) => word.toLowerCase())
		.join('-');

const pascalCase = (str: string): string =>
	str.replace(
		caseExpressions.pascal,
		(m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()
	);

const sqlCase = (str: string): string => snakeCase(str).toUpperCase();

export const password = (password: any): IPassword.Object | any => {
	return {
		validate: (options?: IPassword.Options | any) => {
			if (!options || options === undefined) options = {};
			const customOptions = passwordOptions(options);
			return validatePassword(password, customOptions);
		},
		matches: (password2: string) => {
			return matchPassword(password, password2);
		},
	};
};

export const email = (emailAddress: any): IEmail.Address => {
	return {
		validate: (options: Partial<IEmail.Options> = {}) => {
			if (options.permitted && typeof options.permitted === 'string')
				options.permitted = [options.permitted];
			if (options.restricted && typeof options.restricted === 'string')
				options.restricted = [options.restricted];
			const customOptions = emailOptions(options);
			return validateEmail(emailAddress, customOptions);
		},
	};
};

export const convertCase = (
	...args: Array<string>
): ICase.Conversions | string | IRenderError | null | any => {
	if (!args[0] || args[0] === undefined)
		return renderError('No value provided to convert');
	if (args.length === 1) {
		return {
			original: args[0],
			camel: camelCase(args[0]),
			kebab: kebabCase(args[0]),
			pascal: pascalCase(args[0]),
			snake: snakeCase(args[0]),
			sql: sqlCase(args[0]),
		};
	} else if (args.length === 2) {
		const validCases = ['camel', 'snake', 'kebab', 'pascal', 'sql'];
		const declaredCase = args[1]['case'].toLowerCase();
		if (!validCases.includes(declaredCase))
			return renderError(
				`${declaredCase} is not a valid case. Please use one of the following: ${validCases.join(
					', '
				)}`
			);
		if (declaredCase === 'camel') return camelCase(args[0]);
		if (declaredCase === 'kebab') return kebabCase(args[0]);
		if (declaredCase === 'pascal') return pascalCase(args[0]);
		if (declaredCase === 'snake') return snakeCase(args[0]);
		if (declaredCase === 'sql') return sqlCase(args[0]);
	}
};

export const array = (leftArray: any[]) => {
	if (!leftArray) return renderError('No array provided');
	if (leftArray.constructor.name !== 'Array')
		return renderError(
			`Invalid input type for ${leftArray}. Expected an array, but got ${leftArray.constructor.name}`
		);
	return {
		findDuplicates: (...args: any[]) => {
			let comparisonVal = '';
			let options = {};
			if (args && args.length > 0) {
				args.map((arg) => {
					if (arg.constructor.name === 'String') {
						comparisonVal = arg;
					}
					if (arg.constructor.name === 'Object') {
						options = arg;
					}
				});
			}
			const customOptions = arrayOptions(options);
			return findArrayDupes(leftArray, comparisonVal, customOptions);
		},
	};
};
