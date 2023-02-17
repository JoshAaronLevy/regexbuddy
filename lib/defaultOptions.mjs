export const emailOptions = (options) => {
	return {
		permitted: options.permitted || null,
		restricted: options.restricted || null
	};
}

export const passwordOptions = (options) => {
	return {
		minLength: {
			value: options.minLength ?? 5,
			errorMessage: `Has a minimum of ${options.minLength} characters`,
			valid: false
		},
		requireNumber: {
			value: options.requireNumber ?? true,
			errorMessage: `Contains at least one number`,
			valid: false
		},
		requireSpecialCharacter: {
			value: options.requireSpecialCharacter ?? true,
			errorMessage: `Contains at least one special character`,
			valid: false
		},
		requireUpperCase: {
			value: options.requireUpperCase ?? true,
			errorMessage: `Contains at least one uppercase letter`,
			valid: false
		},
		requireLowerCase: {
			value: options.requireLowerCase ?? true,
			errorMessage: `Contains at least one lowercase letter`,
			valid: false
		}
	}
}

export const caseOptions = (options) => {
	return options.case || null;
}

export const arrayOptions = (options) => {
	return {
		key: options.key || undefined,
		value: options.value || undefined,
		ignoreCase: options.ignoreCase ?? false,
		matchWholeWord: options.matchWholeWord ?? true,
	};
}