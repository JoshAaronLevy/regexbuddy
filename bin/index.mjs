import * as expressions from "../lib/expressions.mjs";
import * as defaultOptions from "../lib/defaultOptions.mjs";

const renderError = (errorMsg) => {
	console.error(`RegexBuddy: ` + errorMsg);
	return false;
}

const validateEmail = (emailAddress, options) => {
	let emailValid = false;
	let message = null;
	if (!emailAddress || emailAddress === undefined) message = `No email address provided`;
	if (emailAddress.constructor.name !== 'String') message = `Invalid input type for email. Expected a string, but got ${emailAddress.constructor.name}`;
	if (!expressions.email(options).base.test(emailAddress)) message = `Invalid email address: ${emailAddress}`;
	if (!options.permitted.value && !options.restricted.value) {
		emailValid = expressions.email(options).base.test(emailAddress);
	} else {
		if (expressions.email(options).base.test(emailAddress)) {
			if (options.permitted.value) {
				const emailCheck = options.permitted.value.map((value) => expressions.email(value).permitted.test(emailAddress)).filter((value) => value === true);
				emailCheck.length > 0 ? emailValid = true : message = `${options.permitted.errorMessage}`;
			} else if (options.restricted.value) {
				const emailCheck = options.restricted.value.map((value) => expressions.email(value).restricted.test(emailAddress)).filter((value) => value === true);
				emailCheck.length === 0 ? emailValid = true : message = `${options.restricted.errorMessage}`;
			}
		}
	}
	return {
		valid: emailValid,
		message: emailValid ? null : message
	};
}

const validatePassword = (password, options) => {
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length >= options.minLength.value) options.minLength.valid = true;
	if (options.requireNumber.value && expressions.password.hasNumber.test(password)) options.requireNumber.valid = true;
	if (options.requireSpecialCharacter.value && expressions.password.hasSpecialCharacter.test(password)) options.requireSpecialCharacter.valid = true;
	if (options.requireUpperCase.value && expressions.password.hasUpperCase.test(password)) options.requireUpperCase.valid = true;
	if (options.requireLowerCase.value && expressions.password.hasLowerCase.test(password)) options.requireLowerCase.valid = true;
	const filteredErrors = Object.values(options).filter((option) => option.valid === false).map((option) => option.errorMessage);
	if (filteredErrors && filteredErrors.length > 0) {
		return {
			valid: false,
			errors: filteredErrors
		}
	} else {
		return {
			valid: true,
			errors: null
		}
	}
}

const findArrayDupes = (leftArray, comparisonVal, options) => {
	let result = {};
	let duplicateVals;
	let uniqueVals;
	const scrubbedSet = new Set(leftArray.filter((item, index) => leftArray.indexOf(item) === index));
	if (comparisonVal && comparisonVal !== '') {
		duplicateVals = leftArray.filter((item) => expressions.array(options, comparisonVal).test(item));
		uniqueVals = leftArray.filter((item) => !expressions.array(options, comparisonVal).test(item));
		result = {
			options: options,
			duplicateList: duplicateVals,
			uniqueList: uniqueVals,
			scrubbedList: [...scrubbedSet],
			duplicateCount: duplicateVals.length || 0,
			uniqueCount: uniqueVals.length || 0
		}
	} else {
		duplicateVals = new Set(leftArray.filter((item, index) => leftArray.indexOf(item) !== index));
		let dupeCount = duplicateVals.size;
		uniqueVals = new Set(leftArray.filter((item, index) => leftArray.indexOf(item) === index));
		let uniqueCount = uniqueVals.size;
		result = {
			options: options,
			duplicateList: [...duplicateVals],
			uniqueList: [...uniqueVals],
			scrubbedList: [...scrubbedSet],
			duplicateCount: dupeCount,
			uniqueCount: uniqueCount
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
			const customOptions = defaultOptions.defaults(options).email;
			return validateEmail(emailAddress, customOptions);
		}
	};
}

export const password = (password) => {
	return {
		validate: (options) => {
			if (!options || options === undefined) options = {};
			const customOptions = defaultOptions.defaults(options).password;
			return validatePassword(password, customOptions);
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
			const customOptions = defaultOptions.defaults(options).array;
			return findArrayDupes(leftArray, comparisonVal, customOptions);
		}
	}
}
