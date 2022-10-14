type MinLength = {
	value: number;
	valid: boolean;
	errorMessage: string;
}

type RequireNumber = {
	value: boolean;
	valid: boolean;
	errorMessage: string;
}

type RequireSpecialCharacter = {
	value: boolean;
	valid: boolean;
	errorMessage: string;
}

type RequireUpperCase = {
	value: boolean;
	valid: boolean;
	errorMessage: string;
}

type RequireLowerCase = {
	value: boolean;
	valid: boolean;
	errorMessage: string;
}

export type PasswordDefaults = {
	minLength: MinLength;
	requireNumber: RequireNumber;
	requireSpecialCharacter: RequireSpecialCharacter;
	requireUpperCase: RequireUpperCase;
	requireLowerCase: RequireLowerCase;
};