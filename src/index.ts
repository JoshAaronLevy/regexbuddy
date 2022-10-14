import { IPassword } from "./interfaces/password.cjs";
import { passwordDefaults } from "./lib/defaultOptions.cjs";
import { passwordExpressions } from "./lib/expressions.cjs";

const renderError = (errorMsg: string) => {
	console.error(`RegexBuddy: ` + errorMsg);
	return false;
}

const validatePassword = (password: string, options: IPassword) => {
	let pwMsgs = passwordDefaults(options).messages;
	if (!password || password === undefined) return renderError(`No password provided`);
	if (password.length >= options.minLength) pwMsgs.minLength.valid = true;
	if (options.requireNumber && passwordExpressions.hasNumber.test(password)) pwMsgs.requireNumber.valid = true;
	if (options.requireSpecialCharacter && passwordExpressions.hasSpecialCharacter.test(password)) pwMsgs.requireSpecialCharacter.valid = true;
	if (options.requireUpperCase && passwordExpressions.hasUpperCase.test(password)) pwMsgs.requireUpperCase.valid = true;
	if (options.requireLowerCase && passwordExpressions.hasLowerCase.test(password)) pwMsgs.requireLowerCase.valid = true;
	const invalidReqs = Object.keys(pwMsgs).filter(key => pwMsgs[key].valid === false);
	const requirements = Object.values(pwMsgs).map((option) => {
		return {
			criteria: option.criteria,
			valid: option.valid
		}
	});
	if (invalidReqs && invalidReqs.length > 0) {
		return {
			valid: false,
			requirements
		}
	} else {
		return {
			valid: true,
			requirements
		}
	}
}

const matchPassword = (password1: string, password2: string) => new RegExp(`^${password1}$`).test(password2);

export const password = (password: string) => {
	return {
		validate: (...args: any) => {
			(!args || args.length === 0 || args === undefined) ? args = {} : args = args[0];
			const customOptions = passwordDefaults(args).options;
			return validatePassword(password, customOptions);
		},
		matches: (password2: string) => {
			return matchPassword(password, password2);
		}
	};
}

console.log(password('password123Noway!').validate({ minLength: 12 }));
