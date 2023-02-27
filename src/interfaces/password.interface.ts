declare module IPassword {
    export interface Options {
        minLength?: number;
        requireNumber?: boolean;
        requireSpecialCharacter?: boolean;
        requireUpperCase?: boolean;
        requireLowerCase?: boolean;
    }
    
    export interface ValidationResult {
        valid: boolean;
        errors: string[] | null;
    }
    
    export interface Object {
        validate: (options?: Options) => ValidationResult;
        matches: (password2: string) => boolean;
    }
}

export = IPassword;
