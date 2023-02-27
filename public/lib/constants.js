"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOptions = exports.arrayExpressions = exports.caseExpressions = exports.emailExpressions = exports.emailOptions = exports.passwordExpressions = exports.passwordOptions = void 0;
const passwordOptions = (options) => {
    return {
        minLength: options.minLength ?? 5,
        requireNumber: options.requireNumber ?? true,
        requireSpecialCharacter: options.requireSpecialCharacter ?? true,
        requireUpperCase: options.requireUpperCase ?? true,
        requireLowerCase: options.requireLowerCase ?? true,
    };
};
exports.passwordOptions = passwordOptions;
exports.passwordExpressions = {
    hasNumber: /(?=(.*[0-9]))/,
    hasSpecialCharacter: /(?=.*[!@#$%^&*])/,
    hasUpperCase: /(?=.*[A-Z])/,
    hasLowerCase: /(?=.*[a-z])/,
};
const emailOptions = (options) => {
    return {
        permitted: options.permitted || null,
        restricted: options.restricted || null,
    };
};
exports.emailOptions = emailOptions;
const emailExpressions = (value) => {
    return {
        base: new RegExp(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/),
        permitted: new RegExp(value, 'i'),
        restricted: new RegExp(value, 'i'),
    };
};
exports.emailExpressions = emailExpressions;
exports.caseExpressions = {
    upper: new RegExp(/([A-Z])/g),
    lower: new RegExp(/([a-z])/g),
    camel: new RegExp(/(?:^\w|[A-Z]|\b\w)/g),
    pascal: new RegExp(/\w\S*/g),
    snake: new RegExp(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g),
    kebab: new RegExp(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g),
};
const arrayExpressions = (options, comparisonVal
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    if (options.ignoreCase && options.matchWholeWord)
        return new RegExp(`\\b${comparisonVal}\\b`, 'i');
    if (options.ignoreCase && !options.matchWholeWord)
        return new RegExp(comparisonVal, 'i');
    if (!options.ignoreCase && options.matchWholeWord)
        return new RegExp(`\\b${comparisonVal}\\b`);
    if (!options.ignoreCase && !options.matchWholeWord)
        return new RegExp(comparisonVal);
};
exports.arrayExpressions = arrayExpressions;
const arrayOptions = (options) => {
    return {
        key: options.key ?? undefined,
        value: options.value ?? undefined,
        ignoreCase: options.ignoreCase ?? false,
        matchWholeWord: options.matchWholeWord ?? true,
    };
};
exports.arrayOptions = arrayOptions;
