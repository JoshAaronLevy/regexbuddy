import { PasswordDefaults } from "./interfaces/password.mjs";
import { passwordOptions } from "./lib/defaultOptions.mjs";
import { passwordExpressions } from "./lib/expressions.mjs";

const renderError = (errorMsg: string) => {
	console.error(`RegexBuddy: ` + errorMsg);
	return false;
}

const validatePassword = (password: string, options: PasswordDefaults) => {
	console.log('options', options);
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length >= options.minLength.value) options.minLength.valid = true;
	if (options.requireNumber.value && passwordExpressions.hasNumber.test(password)) options.requireNumber.valid = true;
	if (options.requireSpecialCharacter.value && passwordExpressions.hasSpecialCharacter.test(password)) options.requireSpecialCharacter.valid = true;
	if (options.requireUpperCase.value && passwordExpressions.hasUpperCase.test(password)) options.requireUpperCase.valid = true;
	if (options.requireLowerCase.value && passwordExpressions.hasLowerCase.test(password)) options.requireLowerCase.valid = true;
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

const matchPassword = (password1: string, password2: string) => new RegExp(`^${password1}$`).test(password2);

export const password = (password: string) => {
	return {
		validate: (options: any) => {
			if (!options || options === undefined) options = {};
			const customOptions = passwordOptions(options).password;
			return validatePassword(password, customOptions);
		},
		matches: (password2: string) => {
			return matchPassword(password, password2);
		}
	};
}

console.log(password('password').validate({ minLength: { value: 5 } }));
