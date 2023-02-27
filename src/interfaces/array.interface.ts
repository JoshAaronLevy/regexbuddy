/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module IArray {
    export interface Options {
        key?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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