export const email = {
	base: new RegExp(/^[^@ ]+@[^@ ]+\.[^@ \.]{2,}$/)
}

export const password = {
	hasNumber: new RegExp(/(?=(.*[0-9]))/),
	hasSpecialCharacters: new RegExp(/(?=.*[!@#$%^&*])/),
	hasUpperCase: new RegExp(/(?=.*[A-Z])/),
	hasLowerCase: new RegExp(/(?=.*[a-z])/),
}