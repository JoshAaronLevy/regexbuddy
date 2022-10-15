import { IPassword } from "../interfaces/password.cjs"

export const PasswordDefaults = (...options: any) => {
	const selectedOptions: IPassword = options[0];
	return {
		options: {
			minLength: selectedOptions.minLength || 5,
			requireNumber: selectedOptions.requireNumber || true,
			requireSpecialCharacter: selectedOptions.requireSpecialCharacter || true,
			requireUpperCase: selectedOptions.requireUpperCase || true,
			requireLowerCase: selectedOptions.requireLowerCase || true
		},
		messages: {
			minLength: {
				criteria: `Has a minimum of ${selectedOptions.minLength} characters`,
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
		},
		returnValue: {
			isValid: false,
			requirements: [],
			passing: [],
			failing: []
		}
	}
}
