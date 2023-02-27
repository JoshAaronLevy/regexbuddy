import { convertCase } from '../dist/bin/index';

describe('convertCase', () => {
	it('should return an error with no value provided to convert', () => {
		const result = convertCase(null, { case: 'camel' });
		expect(result).toEqual({
			valid: false,
			message: 'regexbuddy: No value provided to convert'
		});
	});

	it('should return an error with an invalid case specified', () => {
		const inputCase = 'Mickey Mouse';
		const validCases = ['camel', 'snake', 'kebab', 'pascal', 'sql'];
		const caseOptions = { case: inputCase };
		const result = convertCase('hello world', caseOptions);
		expect(result).toEqual({
			valid: false,
			message: `regexbuddy: ${inputCase.toLowerCase()} is not a valid case. Please use one of the following: ${validCases.join(', ')}`
		});
	});

	it('should convert a string to various cases when no case is specified', () => {
		const result = convertCase('hello world');
		expect(result).toEqual({
			original: 'hello world',
			camel: 'helloWorld',
			snake: 'hello_world',
			kebab: 'hello-world',
			pascal: 'Hello World',
			sql: 'HELLO_WORLD'
		});
	});

	it('should convert a string to camelCase', () => {
		expect(convertCase('hello world', { case: 'camel' })).toEqual('helloWorld');
	});

	it('should convert a string to snake_case', () => {
		expect(convertCase('hello world', { case: 'snake' })).toEqual('hello_world');
	});

	it('should convert a string to kebab-case', () => {
		expect(convertCase('hello world', { case: 'kebab' })).toEqual('hello-world');
	});

	it('should convert a string to PascalCase', () => {
		expect(convertCase('hello world', { case: 'pascal' })).toEqual('Hello World');
	});

	it('should convert a string to SQL_CASE', () => {
		expect(convertCase('hello world', { case: 'sql' })).toEqual('HELLO_WORLD');
	});
});