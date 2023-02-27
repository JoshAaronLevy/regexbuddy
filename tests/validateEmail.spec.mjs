import { email } from '../dist/bin/index';

describe('validateEmail function', () => {
    const errorMessageCheck = (options) => {
        if (options.restricted && options.permitted) {
            return `${options.restricted} email addresses cannot be used. Only ${options.permitted} email addresses are permitted.`;
        } else if (options.restricted && !options.permitted) {
            return `${options.restricted} email addresses cannot be used.`;
        } else if (!options.restricted && options.permitted) {
            return `Only ${options.permitted} email addresses are permitted.`;
        }
    }

    test('validates a correctly formatted email address', () => {
        const emailAddress = 'test@example.com';
        const options = {};
        expect(email(emailAddress).validate(options)).toEqual({
            valid: true,
            message: null
        });
    });

    test('validates an email address with no custom options passed in', () => {
        const emailAddress = 'test@example.com';
        expect(email(emailAddress).validate()).toEqual({
            valid: true,
            message: null
        });
    });

    test('returns an error message if no email is provided', () => {
        const emailAddress = null;
        const options = {};
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: 'Invalid email address: null'
        });
    });

    test('returns an error message if email is not a string', () => {
        const emailAddress = 123;
        const options = {};
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: 'Invalid email address: 123'
        });
    });

    test('returns an error message if email is not valid', () => {
        const emailAddress = 'invalidemail';
        const options = {};
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: 'Invalid email address: invalidemail'
        });
    });

    test('allows emails that match a permitted pattern', () => {
        const emailAddress = 'test@example.com';
        const options = {
            permitted: 'example.com'
        };
        expect(email(emailAddress).validate(options)).toEqual({
            valid: true,
            message: null
        });
    });

    test('disallows emails that do not match a permitted pattern', () => {
        const emailAddress = 'test@notexample.com';
        const options = {
            permitted: ['allowedexample.com']
        };
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: errorMessageCheck(options)
        });
    });

    test('allows emails that do not match a restricted pattern', () => {
        const emailAddress = 'test@example.com';
        const options = {
            restricted: ['notexample.com', 'badexample.com']
        };
        expect(email(emailAddress).validate(options)).toEqual({
            valid: true,
            message: null
        });
    });

    test('disallows emails that match a restricted pattern', () => {
        const emailAddress = 'test@notexample.com';
        const options = {
            restricted: 'notexample.com'
        };
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: errorMessageCheck(options)
        });
    });

    test('displays both restricted and permitted emails in error', () => {
        const emailAddress = 'test@restrictedexample.com';
        const options = {
            permitted: ['allowedexample.com'],
            restricted: ['restrictedexample.com']
        };
        expect(email(emailAddress).validate(options)).toEqual({
            valid: false,
            message: errorMessageCheck(options)
        });
    });
});
