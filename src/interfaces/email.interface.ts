declare module IEmail {
    export interface Options {
        permitted: string[] | null;
        restricted: string[] | null;
    }
    
    export interface Expressions {
        base: RegExp;
        permitted: RegExp;
        restricted: RegExp;
    }
    
    export interface Address {
        validate: (options?: Partial<Options>) => {
            valid: boolean;
            message: string | null;
        };
    }
}

export = IEmail;