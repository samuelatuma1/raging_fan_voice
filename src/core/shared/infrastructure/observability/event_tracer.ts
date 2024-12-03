import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import IEventTracer from "../../application/contract/observability/event_tracer";
import ILogger, { IILogger } from "../../application/contract/observability/logger";
import RandomUtility from "../../application/utils/utilities/random_utility";
import DateUtility from "../../application/utils/utilities/date_utility";

@scoped(Lifecycle.ContainerScoped)
export default class EventTracer implements IEventTracer{
    eventId: string;
    request: object | null;
    response: object | null;
    start: Date;
    end: Date;
    timeline: {[key: string]: string};
    verdict: string;
    counter: number;
    public constructor(@inject(IILogger) private readonly logger: ILogger){
        this.eventId = RandomUtility.newGuid();
        this.request = null;
        this.start = DateUtility.getUTCNow();
        this.end = DateUtility.getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING"
        this.counter = 0;
        this.response = null;
    }
    private addMessageToTimeline(message: string){
        this.timeline[this.counter] = message;
        this.counter++;
    }
    private getEventTracerObject = (): {[key: string]: any} => {
        this.end = DateUtility.getUTCNow();
        return {
            
            eventid: this.eventId,
            request: this.request,
            start: this.start,
            end: this.end,
            timeline: this.timeline,
            verdict: this.verdict,
            counter: this.counter,
            response: this.response,
            duration: this.end.getTime() - this.start.getTime()
        }
    }

    instance(): IEventTracer {
        return new EventTracer(this.logger);
    }
    say(message: string): void {
        this.addMessageToTimeline(message);
    }

    resetTracer = (): void => {
        this.eventId = RandomUtility.newGuid();
        this.request = null;
        this.start = DateUtility.getUTCNow();
        this.end = DateUtility.getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING"
        this.counter = 0;
        this.response = null;
    }
    isException = (): void => {
        this.verdict = "EXCEPTION";
        this.logger.logException(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    }
    isSuccess = (): void => {
        this.verdict = "SUCCESS";
        this.logger.logInfo(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    }
    isError(): void {
        this.verdict = "ERROR";
        this.logger.logWarning(this.eventId, this.getEventTracerObject());
        this.resetTracer();
    }
    isSuccessWithResponseAndMessage = (response: any, message?: string): void => {
        this.response = response;
        if (message){
            this.addMessageToTimeline(message);
        }
        this.isSuccess();
    }
    isExceptionWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isException();
    }
    isSuccessWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isSuccess();
    }
    isErrorWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isError();
    }

}