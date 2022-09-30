export const defaults = (options) => {
	return {
		email: {
			permitted: {
				value: options.permitted || null,
				errorMessage: `Only ${options.permitted.join(', ')} email addresses are permitted.`,
			},
			restricted: {
				value: options.restricted || null,
				errorMessage: options.permitted ? `Only ${options.permitted.join(', ')} email addresses are permitted.` : `${options.restricted.join(', ')} email addresses cannot be used.`,
			}
		},
		password: {
			minLength: {
				value: options.minLength || 5,
				errorMessage: `Has a minimum of ${options.minLength} characters`,
				valid: false
			},
			requireNumber: {
				value: options.requireNumber || true,
				errorMessage: `Contains at least one number`,
				valid: false
			},
			requireSpecialCharacter: {
				value: options.requireSpecialCharacter || true,
				errorMessage: `Contains at least one special character`,
				valid: false
			},
			requireUpperCase: {
				value: options.requireUpperCase || true,
				errorMessage: `Contains at least one uppercase letter`,
				valid: false
			},
			requireLowerCase: {
				value: options.requireLowerCase || true,
				errorMessage: `Contains at least one lowercase letter`,
				valid: false
			}
		},
		case: options.case || null,
		array: {
			key: options.key || undefined,
			value: options.value || undefined,
			ignoreCase: options.ignoreCase || false,
			matchWholeWord: options.matchWholeWord || true,
		}
	}
}