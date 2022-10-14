import { PasswordDefaults } from "../interfaces/password.mjs"

export const passwordOptions = (options: PasswordDefaults) => {
	return {
		password: {
			minLength: {
				value: options.minLength.value || 5,
				errorMessage: `Has a minimum of ${options.minLength} characters`,
				valid: false
			},
			requireNumber: {
				value: options.requireNumber.value || true,
				errorMessage: `Contains at least one number`,
				valid: false
			},
			requireSpecialCharacter: {
				value: options.requireSpecialCharacter.value || true,
				errorMessage: `Contains at least one special character`,
				valid: false
			},
			requireUpperCase: {
				value: options.requireUpperCase.value || true,
				errorMessage: `Contains at least one uppercase letter`,
				valid: false
			},
			requireLowerCase: {
				value: options.requireLowerCase.value || true,
				errorMessage: `Contains at least one lowercase letter`,
				valid: false
			}
		}
	}
}