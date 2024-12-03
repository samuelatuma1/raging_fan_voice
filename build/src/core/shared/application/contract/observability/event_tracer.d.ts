export default interface IEventTracer {
    request: object | null;
    response: object | null;
    say(message: string): void;
    isException(): void;
    isSuccess(): void;
    isError(): void;
    isExceptionWithMessage(message: string): void;
    isSuccessWithMessage(message: string): void;
    isSuccessWithResponseAndMessage(response: any, message?: string): void;
    isErrorWithMessage(message: string): void;
    instance(): IEventTracer;
}
export declare const IIEventTracer = "IEventTracer";
