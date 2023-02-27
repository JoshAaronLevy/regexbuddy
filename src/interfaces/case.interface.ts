/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module ICase {
    export interface Expressions {
        [key: string]: RegExp;
    }
    
    export interface Conversions {
        original: string;
        camel: string;
        kebab: string;
        pascal: string;
        snake: string;
        sql: string;
    }
}

export = ICase;