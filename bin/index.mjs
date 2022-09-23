import * as expressions from "../lib/expressions.mjs";
import * as defaultOptions from "../lib/defaultOptions.mjs";

const renderError = (errorMsg) => {
	console.error(`RegexBuddy: ` + errorMsg);
	return false;
}

const validateEmail = (emailAddress) => {
	let emailValid = false;
	if (!emailAddress || emailAddress === undefined) renderError(`No email address provided`);
	if (emailAddress.constructor.name !== 'String') renderError(`Invalid input type for email. Expected a string, but got ${emailAddress.constructor.name}`);
	!expressions.email.base.exec(emailAddress) ? renderError(`Invalid email address: ${emailAddress}`) : emailValid = true;
	return emailValid;
}

const validatePassword = (password, options) => {
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length < options.minLength) return renderError(`Password must be at least ${options.minLength} characters long`);
	if (options.requireNumber && !expressions.password.hasNumber.test(password)) return renderError(`Password must contain at least one number`);
	if (options.requireSpecialCharacter && !expressions.password.hasSpecialCharacter.test(password)) return renderError(`Password must contain at least one special character`);
	if (options.requireUpperCase && !expressions.password.hasUpperCase.test(password)) return renderError(`Password must contain at least one uppercase letter`);
	if (options.requireLowerCase && !expressions.password.hasLowerCase.test(password)) return renderError(`Password must contain at least one lowercase letter`);
	return true;
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

export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}

export const password = (password) => {
	return {
		validate: (options) => {
			if (!options || options === undefined) options = {};
			options = defaultOptions.passwordOptions(options);
			return validatePassword(password, options);
		}
	};
}

export const array = (leftArray) => {
	if (!leftArray) return renderError(`No array provided`);
	if (leftArray.constructor.name !== 'Array') return renderError(`Invalid input type for ${leftArray}. Expected an array, but got ${leftArray.constructor.name}`);
	return {
		findDuplicates: (comparisonVal, options) => {
			if (!options || options === undefined) options = {};
			options = defaultOptions.arrayOptions(options);
			if (!comparisonVal || comparisonVal === undefined) comparisonVal = '';
			return findArrayDupes(leftArray, comparisonVal, options);
		}
	}
}
