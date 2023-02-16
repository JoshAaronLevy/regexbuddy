import { convertCase } from '../bin/index.mjs';

describe('convertCase', () => {
	it('should return an error with no value provided to convert', () => {
		// expect(convertCase(null, { case: 'camel' })).toEqual(`No value provided to convert`);
		expect(convertCase(null, { case: 'camel' })).toEqual(false);
	});
	it('should return an error with an invalid case specified', () => {
		// expect(convertCase(null, { case: 'camel' })).toEqual(`No value provided to convert`);
		expect(convertCase('hello world', { case: 'Mickey Mouse' })).toEqual(false);
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