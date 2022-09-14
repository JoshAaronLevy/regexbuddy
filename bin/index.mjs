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

export const email = (emailAddress) => {
	return {
		validate: () => validateEmail(emailAddress)
	};
}

export const password = (password) => {
	return {
		validate: (options) => {
			if (!options || options === undefined) options = {};
			const pwOptions = defaultOptions.password(options);
			return validatePassword(password, pwOptions);
		}
	};
}