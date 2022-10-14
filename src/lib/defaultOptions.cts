import { IPassword } from "../interfaces/password.cjs"

export const passwordDefaults = (options: IPassword) => {
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
				valid: false,
			},
			requireNumber: {
				criteria: `Has a number`,
				valid: false,
			},
			requireSpecialCharacter: {
				criteria: `Has a special character`,
				valid: false,
			},
			requireUpperCase: {
				criteria: `Has an uppercase letter`,
				valid: false,
			},
			requireLowerCase: {
				criteria: `Has a lowercase letter`,
				valid: false,
			}
		}
	}
}
