declare module IArray {
    export interface Options {
        key?: string;
        value?: any;
        ignoreCase?: boolean;
        matchWholeWord?: boolean;
    }

    export interface Result {
        duplicateList: string[];
        uniqueList: string[];
        scrubbedList: string[];
        duplicateCount: number;
        uniqueCount: number;
    }
}

export = IArray;