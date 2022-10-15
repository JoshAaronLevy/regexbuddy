export interface IPassword {
	minLength: number;
	requireNumber: boolean;
	requireSpecialCharacter: boolean;
	requireUpperCase: boolean;
	requireLowerCase: boolean;
};

interface IPasswordRequirement {
	criteria: string;
	passes: boolean;
}

export interface IPasswordValidation {
	isValid: boolean;
	requirements: IPasswordRequirement[];
	passing: string[];
	failing: string[];
}
