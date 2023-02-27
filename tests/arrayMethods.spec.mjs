import { array } from '../public/bin/index';

describe('findArrayDupes', () => {
	test('should return error message when no array is provided', () => {
		const result = array();
		expect(result).toEqual({
			valid: false,
			message: 'regexbuddy: No array provided'
		});
	});

	test('should return error message when input type is not an array', () => {
		const inputVal = 'hello world';
		const result = array(inputVal);
		expect(result).toEqual({
			valid: false,
			message: `regexbuddy: Invalid input type for ${inputVal}. Expected an array, but got ${inputVal.constructor.name}`
		});
	});

	test('should return object with scrubbedList and uniqueList when no comparison value is provided', () => {
		const input = ['a', 'b', 'a', 'c'];
		const expectedOutput = {
			duplicateList: ['a'],
			uniqueList: ['b', 'c'],
			scrubbedList: ['a', 'b', 'c'],
			duplicateCount: 1,
			uniqueCount: 2
		};
		expect(array(input).findDuplicates()).toEqual(expectedOutput);
	});

	test('should return object with scrubbedList, uniqueList, and duplicateList when comparison value is provided', () => {
		const input = ['abc123', 'def456', 'abc789'];
		const expectedOutput = {
			duplicateList: [],
			uniqueList: ['abc123', 'def456', 'abc789'],
			scrubbedList: ['abc123', 'def456', 'abc789'],
			duplicateCount: 0,
			uniqueCount: 3
		};
		expect(array(input).findDuplicates('abc', { ignoreCase: true })).toEqual(expectedOutput);
	});

	test('should return object duplicate counts set to 0 when input array has no duplicates', () => {
		const input = ['apple', 'banana', 'cherry'];
		const expectedOutput = {
			duplicateList: [],
			uniqueList: ['apple', 'banana', 'cherry'],
			scrubbedList: ['apple', 'banana', 'cherry'],
			duplicateCount: 0,
			uniqueCount: 3
		};
		expect(array(input).findDuplicates()).toEqual(expectedOutput);
	});

	test('should return object unique count of 0 when input array has all duplicates', () => {
		const input = ['apple', 'apple', 'apple'];
		const expectedOutput = {
			duplicateList: ['apple', 'apple'],
			uniqueList: [],
			scrubbedList: ['apple'],
			duplicateCount: 2,
			uniqueCount: 0
		};
		expect(array(input).findDuplicates({ ignoreCase: false, matchWholeWord: true })).toEqual(expectedOutput);
	});

	test('should return object unique count of 0 when input array has all duplicates of comparison value', () => {
		const input = ['apple', 'apple', 'apple'];
		const expectedOutput = {
			duplicateList: ['apple', 'apple'],
			uniqueList: [],
			scrubbedList: ['apple'],
			duplicateCount: 2,
			uniqueCount: 0
		};
		expect(array(input).findDuplicates(['apple', { ignoreCase: false, matchWholeWord: true }])).toEqual(expectedOutput);
	});

	test('should return expected output with ignoreCase set to false and matchWholeWord set to true', () => {
		const input = ['apple', 'APPLE', 'apple'];
		const expectedOutput = {
			duplicateList: ['APPLE'],
			uniqueList: ['apple', 'apple'],
			scrubbedList: ['apple', 'APPLE'],
			duplicateCount: 1,
			uniqueCount: 2
		};
		expect(array(input).findDuplicates('APPLE', { ignoreCase: false, matchWholeWord: true })).toEqual(expectedOutput);
	});

	test('should return expected output with ignoreCase set to false and matchWholeWord set to false', () => {
		const input = ['apple', 'APPLE', 'apple'];
		const expectedOutput = {
			duplicateList: [ 'APPLE' ],
			uniqueList: [ 'apple', 'apple' ],
			scrubbedList: [ 'apple', 'APPLE' ],
			duplicateCount: 1,
			uniqueCount: 2
		};
		expect(array(input).findDuplicates('APPLE', { ignoreCase: false, matchWholeWord: false })).toEqual(expectedOutput);
	});

	test('should return expected output with ignoreCase set to true and matchWholeWord set to false', () => {
		const input = ['apple', 'APPLE', 'apple'];
		const expectedOutput = {
			duplicateList: [ 'apple', 'APPLE', 'apple' ],
			uniqueList: [ 'APPLE' ],
			scrubbedList: [ 'apple', 'APPLE' ],
			duplicateCount: 3,
			uniqueCount: 1
		};
		expect(array(input).findDuplicates('APPLE', { ignoreCase: true, matchWholeWord: false })).toEqual(expectedOutput);
	});

	test('should return object unique count of 0 when input array has all duplicates of comparison value', () => {
		const input = ['APPLE', 'APPLE', 'APPLE'];
		const expectedOutput = {
			duplicateList: [ 'APPLE', 'APPLE', 'APPLE' ],
			uniqueList: [],
			scrubbedList: [ 'APPLE' ],
			duplicateCount: 3,
			uniqueCount: 0
		};
		expect(array(input).findDuplicates('APPLE')).toEqual(expectedOutput);
	});

	test('should return object with all counts set to 0 when input array is empty', () => {
		const input = [];
		const expectedOutput = {
			duplicateList: [],
			uniqueList: [],
			scrubbedList: [],
			duplicateCount: 0,
			uniqueCount: 0
		};
		expect(array(input).findDuplicates()).toEqual(expectedOutput);
	});
});
