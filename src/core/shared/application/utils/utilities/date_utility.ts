import { setTimeout } from "timers/promises";
export default class DateUtility{
    static getUTCNow = (): Date => {
        return new Date(new Date().toISOString());
    }

    static getUnixTimeInMilliseconds = (): number => {
        let date = new Date();

        return date.getTime();
    }

    static delay = async (seconds: number): Promise<void> => {
        await setTimeout(seconds * 1000);
    }

    static addTimeToCurrentTime = (seconds: number): Date => {
        return new Date(DateUtility.getUTCNow().getTime() + seconds * 1000);
    }
}