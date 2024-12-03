import SerializationUtility from "./serialization_utility";

export default class ObjectUtility {
    static areListsEqual = (list1: string[] | number[] | boolean[], list2: string[] | number[] | boolean[] ) => {
        if(list1.length !== list2.length)
            return false;
        
        for(let idx = 0; idx < list1.length; idx++){
            const itemAtIdx1 = list1[idx];
            const itemAtIdx2 = list2[idx];

            if(itemAtIdx1 !== itemAtIdx2){
                return false;
            }
        }

        return true;
    }

    static objectSize = (obj: {[key: string]: any}): number => {
        return Object.keys(obj).length;
    }

    static removeNullOrUndefinedValuesFromObject<T>(obj: T) : T {
        let response : {[key: string]: any}= {}
        for (let [key, value] of Object.entries(obj)){
            if(value === null || value === undefined){

            }
            else{
                response[key] = value
            }
        }
        return response as T;
    }

    static updateAwithB<T extends object>(a: T, b: Partial<T>): T{
        let c = SerializationUtility.serializeJson(a);
        let d = SerializationUtility.deserializeJson<{[key: string]: any}>(c);
        for(let [key, value] of Object.entries(b)){
            d[key] = value
        }
        return d as T;
    }

    static toDict<T extends object>(list: T[], key: string): {[key: string]: T}{
        let response: {[key: string]: T} = {}
        for(let item of list){
            const itemDict = item as {[key: string]: any}
            const stringKey = (itemDict[key])?.toString()
            if(stringKey){
                response[stringKey] = item
            }
        }

        return response
    }

    static toDictList<T extends object>(list: T[], key: string): {[key: string]: T[]}{
        let response: {[key: string]: T[]} = {}
        for(let item of list){
            const itemDict = item as {[key: string]: any}
            const stringKey = (itemDict[key])?.toString()
            if(stringKey){
                const idItems = response[stringKey] ?? []
                idItems.push(item)
                response[stringKey] = idItems
            }
        }
        return response
    }
}