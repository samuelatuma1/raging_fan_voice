export default class DateUtility {
    static getUTCNow: () => Date;
    static getUnixTimeInMilliseconds: () => number;
    static delay: (seconds: number) => Promise<void>;
    static addTimeToCurrentTime: (seconds: number) => Date;
}
