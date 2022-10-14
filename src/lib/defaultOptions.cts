import { IPassword } from "../interfaces/password.cjs"

export const PasswordDefaults = (options: IPassword) => {
	return {
		options: {
			minLength: options.minLength || 5,
			requireNumber: options.requireNumber || true,
			requireSpecialCharacter: options.requireSpecialCharacter || true,
			requireUpperCase: options.requireUpperCase || true,
			requireLowerCase: options.requireLowerCase || true
		},
		messages: {
			minLength: {
				criteria: `Has a minimum of ${options.minLength} characters`,
				passes: false,
			},
			requireNumber: {
				criteria: `Has a number`,
				passes: false,
			},
			requireSpecialCharacter: {
				criteria: `Has a special character`,
				passes: false,
			},
			requireUpperCase: {
				criteria: `Has an uppercase letter`,
				passes: false,
			},
			requireLowerCase: {
				criteria: `Has a lowercase letter`,
				passes: false,
			}
		}
	}
}
