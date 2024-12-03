import { IEmailConfig } from "./config/mail_config";
import nodemailer from 'nodemailer';
import { IMailService } from "../../../../core/chat/application/contract/service/mail_service";
export declare class MailService implements IMailService {
    private service;
    private email_username;
    private email_password;
    constructor(mailConfig: IEmailConfig);
    createTransport: () => nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    sendMail: (to: string, subject: string, html: string) => Promise<{
        response: string;
        isSuccess: boolean;
    }>;
    sendMailToMultipleRecipients: (recipients: string[], subject: string, html: string) => Promise<{
        response: string;
        isSuccess: boolean;
    }[]>;
    craftMailTemplate(mailBody: string): string;
}
