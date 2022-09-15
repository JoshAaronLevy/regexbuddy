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
	if (options.requireSpecialCharacters && !expressions.password.hasSpecialCharacters.test(password)) return renderError(`Password must contain at least one special character`);
	if (options.requireUpperCase && !expressions.password.hasUpperCase.test(password)) return renderError(`Password must contain at least one uppercase letter`);
	if (options.requireLowerCase && !expressions.password.hasLowerCase.test(password)) return renderError(`Password must contain at least one lowercase letter`);
	return true;
}

const findArrayDupes = (firstArray, arrayOptions, comparisonArray) => {
	let result = {
		duplicates: [],
		unique: [],
		dupeCount: 0,
	}
	if (!arrayOptions) {
		if (comparisonArray) {
			for (let i = 0; i < firstArray.length; i++) {
				for (let j = 0; j < comparisonArray.length; j++) {
					if (firstArray[i] === comparisonArray[j]) {
						result.duplicates.push(firstArray[i]);
						result.dupeCount++;
					} else {
						result.unique.push(firstArray[i]);
					}
				}
			}
		} else {
			result = new Set(firstArray.filter((item, index) => array.indexOf(item) !== index));
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
			const pwOptions = defaultOptions.passwordOptions(options);
			return validatePassword(password, pwOptions);
		}
	};
}

export const array = (firstArray, options) => {
	if (!firstArray) return renderError(`No array provided`);
	if (firstArray.constructor.name !== 'Array') return renderError(`Invalid input type for ${firstArray}. Expected an array, but got ${firstArray.constructor.name}`);
	return {
		findDuplicates: (comparisonArray) => {
			let arrayOptions;
			(!options || options === undefined) ? arrayOptions = null : arrayOptions = defaultOptions.arrayOptions(options);
			if (!comparisonArray || comparisonArray === undefined) comparisonArray = null;
			return findArrayDupes(firstArray, arrayOptions, comparisonArray);
		}
	}
}