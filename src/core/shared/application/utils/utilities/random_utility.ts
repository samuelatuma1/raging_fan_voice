import {v4} from "uuid";
export default class RandomUtility {
    static newGuid = (): string => {
        return v4()
    }

    static randomNumbersAsString = (size: number) : string => {
        let response = ""
        for(let i = 0; i < size; i++){
            response += `${Math.floor(Math.random() * 10)}`
        }

        return response
    }

    static randomNumber = (size: number) : number => {
        
        return Math.floor(Math.random() * (10 * size))
    }
}