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