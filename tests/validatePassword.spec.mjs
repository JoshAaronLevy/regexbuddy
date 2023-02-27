import { password } from '../public/bin/index';

describe('password', () => {
	describe('validate', () => {
		it('should return an object with valid: true and errors: null for a valid password', () => {
			const testPassword = password('myPassword123!');
			const options = { minLength: 8 };
			const result = testPassword.validate(options);
			expect(result).toEqual({ valid: true, errors: null });
		});

		it('should return an object with valid: false and an array of errors for an invalid password', () => {
			const testPassword = password('myPassword123');
			const options = { minLength: 15 };
			const result = testPassword.validate(options);
			expect(result).toEqual({ valid: false, errors: [`Has a minimum of ${options.minLength} characters`, 'Contains at least one special character'] });
		});

		it('should validate against default options if no custom options are provided', () => {
			const testPassword = password('myPassword123!');
			const result = testPassword.validate();
			expect(result).toEqual({ valid: true, errors: null });
		});

		it('should return an error message if no password is provided', () => {
			const noPassword = password('');
			const result = noPassword.validate({ minLength: 8 });
			expect(result).toEqual({ valid: false, message: 'regexbuddy: No password provided' });
		});

		it('should return an error message if the password is missing a number', () => {
			const testPassword = password('myPassword!');
			const result = testPassword.validate();
			expect(result).toEqual({ valid: false, errors: ['Contains at least one number'] });
		});

		it('should return an error message if the password is missing an uppercase letter', () => {
			const testPassword = password('mypassword123!');
			const result = testPassword.validate();
			expect(result).toEqual({ valid: false, errors: ['Contains at least one uppercase letter'] });
		});

		it('should return an error message if the password is missing an lowercase letter', () => {
			const testPassword = password('MYPASSWORD123!');
			const result = testPassword.validate();
			expect(result).toEqual({ valid: false, errors: ['Contains at least one lowercase letter'] });
		});
	});

	describe('matches', () => {
		const testPassword = password('myPassword123');

		it('should return true if the provided password matches the original password', () => {
			const result = testPassword.matches('myPassword123');
			expect(result).toBe(true);
		});

		it('should return false if the provided password does not match the original password', () => {
			const result = testPassword.matches('notMyPassword');
			expect(result).toBe(false);
		});
	});
});