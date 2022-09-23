export const passwordOptions = (options) => {
	return {
		minLength: options.minLength || 5,
		requireNumber: options.requireNumber || true,
		requireSpecialCharacter: options.requireSpecialCharacter || true,
		requireUpperCase: options.requireUpperCase || true,
		requireLowerCase: options.requireLowerCase || true
	}
}

export const arrayOptions = (options) => {
	return {
		value: options.value || undefined,
		ignoreCase: options.ignoreCase || false,
		matchWholeWord: options.matchWholeWord || true,
	}
}