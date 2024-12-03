export default class ObjectUtility {
    static areListsEqual: (list1: string[] | number[] | boolean[], list2: string[] | number[] | boolean[]) => boolean;
    static objectSize: (obj: {
        [key: string]: any;
    }) => number;
    static removeNullOrUndefinedValuesFromObject<T>(obj: T): T;
    static updateAwithB<T extends object>(a: T, b: Partial<T>): T;
    static toDict<T extends object>(list: T[], key: string): {
        [key: string]: T;
    };
    static toDictList<T extends object>(list: T[], key: string): {
        [key: string]: T[];
    };
}
