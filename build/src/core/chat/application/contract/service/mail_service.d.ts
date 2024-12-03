export interface IMailService {
    sendMail(to: string, subject: string, html: string): Promise<{
        response: string;
        isSuccess: boolean;
    }>;
    sendMailToMultipleRecipients(recipients: string[], subject: string, html: string): Promise<{
        response: string;
        isSuccess: boolean;
    }[]>;
}
export declare const IIMailService = "IMailService";
