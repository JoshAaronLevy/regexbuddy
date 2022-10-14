export type IPassword = {
	minLength: number;
	requireNumber: boolean;
	requireSpecialCharacter: boolean;
	requireUpperCase: boolean;
	requireLowerCase: boolean;
};