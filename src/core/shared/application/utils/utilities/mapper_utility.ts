
export default class MapperUtility {
    public static map<T extends object, U>(source: T ) : U {
        let result = {} as U;
        var mapping = {...source}
        for(let key in mapping){
            
            (result as any)[key] = (source as any)[mapping[key]];
        }
        return result;
    }
}