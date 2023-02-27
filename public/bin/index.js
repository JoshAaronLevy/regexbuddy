"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = exports.convertCase = exports.email = exports.password = void 0;
const constants_1 = require("../lib/constants");
const renderError = (errorMsg) => {
    return {
        valid: false,
        message: `regexbuddy: ${errorMsg}`,
    };
};
const validatePassword = (password, options) => {
    const invalidCriteria = [];
    if (!password || password === undefined)
        return renderError('No password provided');
    if (password.length < options.minLength)
        invalidCriteria.push(`Has a minimum of ${options.minLength} characters`);
    if (options.requireNumber && !constants_1.passwordExpressions.hasNumber.test(password))
        invalidCriteria.push('Contains at least one number');
    if (options.requireSpecialCharacter &&
        !constants_1.passwordExpressions.hasSpecialCharacter.test(password))
        invalidCriteria.push('Contains at least one special character');
    if (options.requireUpperCase &&
        !constants_1.passwordExpressions.hasUpperCase.test(password))
        invalidCriteria.push('Contains at least one uppercase letter');
    if (options.requireLowerCase &&
        !constants_1.passwordExpressions.hasLowerCase.test(password))
        invalidCriteria.push('Contains at least one lowercase letter');
    if (invalidCriteria.length > 0) {
        return {
            valid: false,
            errors: invalidCriteria,
        };
    }
    else {
        return {
            valid: true,
            errors: null,
        };
    }
};
const matchPassword = (password1, password2) => new RegExp(`^${password1}$`).test(password2);
const validateEmail = (emailAddress, options) => {
    let emailValid = false;
    let message = '';
    if (!emailAddress || emailAddress === undefined) {
        message = 'No email address provided';
    }
    if (typeof emailAddress !== 'string') {
        message = `Invalid input type for email. Expected a string, but got ${typeof emailAddress}`;
    }
    if (!(0, constants_1.emailExpressions)('').base.test(emailAddress)) {
        message = `Invalid email address: ${emailAddress}`;
    }
    if (!options.permitted && !options.restricted) {
        emailValid = (0, constants_1.emailExpressions)('').base.test(emailAddress);
    }
    else {
        if ((0, constants_1.emailExpressions)('').base.test(emailAddress)) {
            const permittedEmails = options.permitted?.join(', ') || null;
            const restrictedEmails = options.restricted?.join(', ') || null;
            if (options.restricted) {
                const emailCheck = options.restricted
                    .map((value) => (0, constants_1.emailExpressions)(value).restricted.test(emailAddress))
                    .filter((value) => value === true);
                if (emailCheck.length === 0) {
                    emailValid = true;
                }
                else {
                    if (options.permitted) {
                        message = `${restrictedEmails} email addresses cannot be used. Only ${permittedEmails} email addresses are permitted.`;
                    }
                    else {
                        message = `${restrictedEmails} email addresses cannot be used.`;
                    }
                }
            }
            else if (options.permitted) {
                const emailCheck = options.permitted
                    .map((value) => (0, constants_1.emailExpressions)(value).permitted.test(emailAddress))
                    .filter((value) => value === true);
                emailCheck.length > 0
                    ? (emailValid = true)
                    : (message = `Only ${permittedEmails} email addresses are permitted.`);
            }
        }
    }
    return {
        valid: emailValid,
        message: emailValid ? null : message,
    };
};
const findArrayDupes = (leftArray, comparisonVal, options) => {
    let result = {};
    const scrubbedSet = new Set(leftArray.filter((item, index) => leftArray.indexOf(item) === index));
    if (comparisonVal && comparisonVal !== '') {
        const duplicateVals = leftArray.filter((item) => (0, constants_1.arrayExpressions)(options, comparisonVal).test(item));
        let uniqueVals;
        if (duplicateVals.length > 0) {
            uniqueVals = duplicateVals.map((item) => leftArray.filter((val) => val !== item))[0];
        }
        else {
            uniqueVals = leftArray;
        }
        result = {
            duplicateList: duplicateVals,
            uniqueList: uniqueVals,
            scrubbedList: [...scrubbedSet],
            duplicateCount: duplicateVals?.length || 0,
            uniqueCount: uniqueVals?.length || 0,
        };
    }
    else {
        const duplicateVals = leftArray.filter((item, index) => leftArray.indexOf(item) !== index);
        let uniqueVals;
        if (duplicateVals.length > 0) {
            uniqueVals = duplicateVals.map((item) => leftArray.filter((val) => val !== item))[0];
        }
        else {
            uniqueVals = leftArray;
        }
        result = {
            duplicateList: duplicateVals,
            uniqueList: uniqueVals,
            scrubbedList: [...scrubbedSet],
            duplicateCount: duplicateVals?.length || 0,
            uniqueCount: uniqueVals?.length || 0,
        };
    }
    return result;
};
const camelCase = (str) => str
    .replace(constants_1.caseExpressions.camel, (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '');
const snakeCase = (str) => str
    .match(constants_1.caseExpressions.snake)
    .map((word) => word.toLowerCase())
    .join('_');
const kebabCase = (str) => str
    .match(constants_1.caseExpressions.kebab)
    .map((word) => word.toLowerCase())
    .join('-');
const pascalCase = (str) => str.replace(constants_1.caseExpressions.pascal, (m) => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase());
const sqlCase = (str) => snakeCase(str).toUpperCase();
const password = (password) => {
    return {
        validate: (options) => {
            if (!options || options === undefined)
                options = {};
            const customOptions = (0, constants_1.passwordOptions)(options);
            return validatePassword(password, customOptions);
        },
        matches: (password2) => {
            return matchPassword(password, password2);
        },
    };
};
exports.password = password;
const email = (emailAddress) => {
    return {
        validate: (options = {}) => {
            if (options.permitted && typeof options.permitted === 'string')
                options.permitted = [options.permitted];
            if (options.restricted && typeof options.restricted === 'string')
                options.restricted = [options.restricted];
            const customOptions = (0, constants_1.emailOptions)(options);
            return validateEmail(emailAddress, customOptions);
        },
    };
};
exports.email = email;
const convertCase = (...args) => {
    if (!args[0] || args[0] === undefined)
        return renderError('No value provided to convert');
    if (args.length === 1) {
        return {
            original: args[0],
            camel: camelCase(args[0]),
            kebab: kebabCase(args[0]),
            pascal: pascalCase(args[0]),
            snake: snakeCase(args[0]),
            sql: sqlCase(args[0]),
        };
    }
    else if (args.length === 2) {
        const validCases = ['camel', 'snake', 'kebab', 'pascal', 'sql'];
        const declaredCase = args[1]['case'].toLowerCase();
        if (!validCases.includes(declaredCase))
            return renderError(`${declaredCase} is not a valid case. Please use one of the following: ${validCases.join(', ')}`);
        if (declaredCase === 'camel')
            return camelCase(args[0]);
        if (declaredCase === 'kebab')
            return kebabCase(args[0]);
        if (declaredCase === 'pascal')
            return pascalCase(args[0]);
        if (declaredCase === 'snake')
            return snakeCase(args[0]);
        if (declaredCase === 'sql')
            return sqlCase(args[0]);
    }
};
exports.convertCase = convertCase;
const array = (leftArray) => {
    if (!leftArray)
        return renderError('No array provided');
    if (leftArray.constructor.name !== 'Array')
        return renderError(`Invalid input type for ${leftArray}. Expected an array, but got ${leftArray.constructor.name}`);
    return {
        findDuplicates: (...args) => {
            let comparisonVal = '';
            let options = {};
            if (args && args.length > 0) {
                args.map((arg) => {
                    if (arg.constructor.name === 'String') {
                        comparisonVal = arg;
                    }
                    if (arg.constructor.name === 'Object') {
                        options = arg;
                    }
                });
            }
            const customOptions = (0, constants_1.arrayOptions)(options);
            return findArrayDupes(leftArray, comparisonVal, customOptions);
        },
    };
};
exports.array = array;
