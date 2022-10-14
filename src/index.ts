import { IPassword } from "./interfaces/password.cjs";
import { PasswordDefaults } from "./lib/defaultOptions.cjs";
import { passwordExpressions } from "./lib/expressions.cjs";

const renderError = (errorMsg: string) => {
	console.error(`RegexBuddy: ` + errorMsg);
	return false;
}

const validatePassword = (password: string, options: IPassword) => {
	let pwMsgs = PasswordDefaults(options).messages;
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length >= options.minLength) pwMsgs.minLength.passes = true;
	if (options.requireNumber && passwordExpressions.hasNumber.test(password)) pwMsgs.requireNumber.passes = true;
	if (options.requireSpecialCharacter && passwordExpressions.hasSpecialCharacter.test(password)) pwMsgs.requireSpecialCharacter.passes = true;
	if (options.requireUpperCase && passwordExpressions.hasUpperCase.test(password)) pwMsgs.requireUpperCase.passes = true;
	if (options.requireLowerCase && passwordExpressions.hasLowerCase.test(password)) pwMsgs.requireLowerCase.passes = true;
	const passingCriteria = Object.values(pwMsgs).filter((msg) => msg.passes === true).map((msg) => msg.criteria);
	const failingCriteria = Object.values(pwMsgs).filter((msg) => msg.passes === false).map((msg) => msg.criteria);
	return {
		isValid: (Object.keys(pwMsgs).filter(key => pwMsgs[key].passes === false).length > 0) ? false : true,
		requirements: Object.values(pwMsgs).map((option) => {
			return {
				criteria: option.criteria,
				passes: option.passes
			}
		}),
		passing: passingCriteria,
		failing: failingCriteria
	}
}

const matchPassword = (password1: string, password2: string) => new RegExp(`^${password1}$`).test(password2);

export const password = (password: string) => {
	return {
		validate: (...args: any) => {
			(!args || args.length === 0 || args === undefined) ? args = {} : args = args[0];
			const customOptions = PasswordDefaults(args).options;
			return validatePassword(password, customOptions);
		},
		matches: (password2: string) => {
			return matchPassword(password, password2);
		}
	};
}
