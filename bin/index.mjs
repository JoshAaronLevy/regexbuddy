import * as expressions from "../lib/expressions.mjs";
import { emailOptions, passwordOptions, caseOptions, arrayOptions } from "../lib/defaultOptions.mjs";

const renderError = (errorMsg) => {
	return {
		valid: false,
		message: `regexbuddy: ${errorMsg}`
	}
}

const validateEmail = (emailAddress, options) => {
	let emailValid = false;
	let message = null;
	if (!emailAddress || emailAddress === undefined) message = `No email address provided`;
	if (emailAddress?.constructor.name !== 'String') message = `Invalid input type for email. Expected a string, but got ${emailAddress?.constructor.name}`;
	if (!expressions.email(options).base.test(emailAddress)) message = `Invalid email address: ${emailAddress}`;
	if (!options.permitted && !options.restricted) {
		emailValid = expressions.email(options).base.test(emailAddress);
	} else {
		if (expressions.email(options).base.test(emailAddress)) {
			let permittedEmails = options.permitted?.join(', ') || null;
			let restrictedEmails = options.restricted?.join(', ') || null;
			if (options.restricted) {
				const emailCheck = options.restricted.map((value) => expressions.email(value).restricted.test(emailAddress)).filter((value) => value === true);
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
				const emailCheck = options.permitted.map((value) => expressions.email(value).permitted.test(emailAddress)).filter((value) => value === true);
				emailCheck.length > 0 ? emailValid = true : message = `Only ${permittedEmails} email addresses are permitted.`;
			}
		}
	}
	return {
		valid: emailValid,
		message: emailValid ? null : message
	};
}

const validatePassword = (password, options) => {
	let invalidCriteria = [];
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length < options.minLength) invalidCriteria.push(`Has a minimum of ${options.minLength} characters`);
	if (options.requireNumber && !expressions.password.hasNumber.test(password)) invalidCriteria.push(`Contains at least one number`);
	if (options.requireSpecialCharacter && !expressions.password.hasSpecialCharacter.test(password)) invalidCriteria.push(`Contains at least one special character`);
	if (options.requireUpperCase && !expressions.password.hasUpperCase.test(password)) invalidCriteria.push(`Contains at least one uppercase letter`);
	if (options.requireLowerCase && !expressions.password.hasLowerCase.test(password)) invalidCriteria.push(`Contains at least one lowercase letter`);
	if (invalidCriteria.length > 0) {
		return {
			valid: false,
			errors: invalidCriteria
		}
	} else {
		return {
			valid: true,
			errors: null
		}
	}
}

const matchPassword = (password1, password2) => new RegExp(`^${password1}$`).test(password2);

const findArrayDupes = (leftArray, comparisonVal, options) => {
	let result = {};
	const scrubbedSet = new Set(leftArray.filter((item, index) => leftArray.indexOf(item) === index));
	if (comparisonVal && comparisonVal !== '') {
		const duplicateVals = leftArray.filter((item) => expressions.array(options, comparisonVal).test(item));
		let uniqueVals;
		if (duplicateVals.length > 0) {
			uniqueVals = duplicateVals.map((item) => leftArray.filter((val) => val !== item))[0];
		} else {
			uniqueVals = leftArray;
		}
		result = {
			duplicateList: duplicateVals,
			uniqueList: uniqueVals,
			scrubbedList: [...scrubbedSet],
			duplicateCount: duplicateVals?.length || 0,
			uniqueCount: uniqueVals?.length || 0
		}
	} else {
		const duplicateVals = leftArray.filter((item, index) => leftArray.indexOf(item) !== index);
		let uniqueVals;
		if (duplicateVals.length > 0) {
			uniqueVals = duplicateVals.map((item) => leftArray.filter((val) => val !== item))[0];
		} else {
			uniqueVals = leftArray;
		}
		result = {
			duplicateList: duplicateVals,
			uniqueList: uniqueVals,
			scrubbedList: [...scrubbedSet],
			duplicateCount: duplicateVals?.length || 0,
			uniqueCount: uniqueVals?.length || 0
		}
	}
	return result;
}

const camelCase = (str) => str.replace(expressions.cases.camel, (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');

const snakeCase = (str) => str.match(expressions.cases.snake).map((word) => word.toLowerCase()).join('_');

const kebabCase = (str) => str.match(expressions.cases.kebab).map((word) => word.toLowerCase()).join('-');

const pascalCase = (str) => str.replace(expressions.cases.pascal, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase());

const sqlCase = (str) => snakeCase(str).toUpperCase();

export const email = (emailAddress) => {
	return {
		validate: (options) => {
			if (!options || options === undefined) {
				options = {};
			} else {
				if (options.permitted && options.permitted.constructor.name === 'String') options.permitted = [options.permitted];
				if (options.restricted && options.restricted.constructor.name === 'String') options.restricted = [options.restricted];
			}
			const customOptions = emailOptions(options);
			return validateEmail(emailAddress, customOptions);
		}
	};
}

export const password = (password) => {
	return {
		validate: (options) => {
			if (!options || options === undefined) options = {};
			const customOptions = passwordOptions(options);
			return validatePassword(password, customOptions);
		},
		matches: (password2) => {
			return matchPassword(password, password2);
		}
	};
}

export const convertCase = (...args) => {
	if (!args[0] || args[0] === undefined) return renderError(`No value provided to convert`);
	if (args.length === 1) {
		return {
			original: args[0],
			camel: camelCase(args[0]),
			kebab: kebabCase(args[0]),
			pascal: pascalCase(args[0]),
			snake: snakeCase(args[0]),
			sql: sqlCase(args[0])
		}
	} else if (args.length === 2) {
		const validCases = ['camel', 'snake', 'kebab', 'pascal', 'sql'];
		const declaredCase = args[1]['case'].toLowerCase();
		if (!validCases.includes(declaredCase)) return renderError(`${declaredCase} is not a valid case. Please use one of the following: ${validCases.join(', ')}`);
		if (declaredCase === 'camel') return camelCase(args[0]);
		if (declaredCase === 'kebab') return kebabCase(args[0]);
		if (declaredCase === 'pascal') return pascalCase(args[0]);
		if (declaredCase === 'snake') return snakeCase(args[0]);
		if (declaredCase === 'sql') return sqlCase(args[0]);
	}
}

export const array = (leftArray) => {
	if (!leftArray) return renderError(`No array provided`);
	if (leftArray.constructor.name !== 'Array') return renderError(`Invalid input type for ${leftArray}. Expected an array, but got ${leftArray.constructor.name}`);
	return {
		findDuplicates: (...args) => {
			let comparisonVal = '';
			let options = {};
			if (args && args.length > 0) {
				args.map(arg => {
					if (arg.constructor.name === 'String') {
						comparisonVal = arg;
					}
					if (arg.constructor.name === 'Object') {
						options = arg;
					}
				})
			}
			const customOptions = arrayOptions(options);
			return findArrayDupes(leftArray, comparisonVal, customOptions);
		}
	}
}
