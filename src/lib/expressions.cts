export const passwordExpressions = {
	hasNumber: new RegExp(/(?=(.*[0-9]))/),
	hasSpecialCharacter: new RegExp(/(?=.*[!@#$%^&*])/),
	hasUpperCase: new RegExp(/(?=.*[A-Z])/),
	hasLowerCase: new RegExp(/(?=.*[a-z])/),
};