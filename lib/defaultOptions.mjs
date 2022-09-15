export const passwordOptions = (options) => {
	return {
		minLength: options.minLength || 5,
		requireNumber: options.requireNumber || true,
		requireSpecialCharacters: options.requireSpecialCharacters || true,
		requireUpperCase: options.requireUpperCase || true,
		requireLowerCase: options.requireLowerCase || true
	}
}

export const arrayOptions = (options) => {
	return {
		value: options.value || null,
	}
}