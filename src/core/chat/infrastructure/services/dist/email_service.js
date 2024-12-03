"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MailService = void 0;
var tsyringe_1 = require("tsyringe");
var mail_config_1 = require("./config/mail_config");
var nodemailer_1 = require("nodemailer");
var MailService = /** @class */ (function () {
    function MailService(mailConfig) {
        var _this = this;
        this.createTransport = function () {
            return nodemailer_1["default"].createTransport({
                service: _this.service,
                auth: {
                    user: _this.email_username,
                    pass: _this.email_password
                }
            });
        };
        this.sendMail = function (to, subject, html) { return __awaiter(_this, void 0, Promise, function () {
            var transporter, mailBody, from, mailRequest, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        transporter = this.createTransport();
                        mailBody = this.craftMailTemplate(html);
                        from = {
                            name: 'Psychivity Test',
                            address: this.email_username
                        };
                        return [4 /*yield*/, transporter.sendMail({ from: from, to: to, subject: subject, html: mailBody })
                            // console.log(mailRequest)
                        ];
                    case 1:
                        mailRequest = _a.sent();
                        // console.log(mailRequest)
                        console.log(mailBody);
                        return [2 /*return*/, { response: mailRequest.response, isSuccess: true }];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { response: "An error occured while sending mail" + ("Mail to " + to + " not sent. " + err_1.message), isSuccess: false }];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.sendMailToMultipleRecipients = function (recipients, subject, html) { return __awaiter(_this, void 0, Promise, function () {
            var response, _i, recipients_1, email, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        response = [];
                        _i = 0, recipients_1 = recipients;
                        _a.label = 1;
                    case 1:
                        if (!(_i < recipients_1.length)) return [3 /*break*/, 4];
                        email = recipients_1[_i];
                        return [4 /*yield*/, this.sendMail(email, subject, html)];
                    case 2:
                        res = _a.sent();
                        response.push(res);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log({ response: response });
                        return [2 /*return*/, response];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, [{ response: "An error occured while sending mail" + ("Mail to " + recipients + " not sent. " + err_2.message), isSuccess: false }]];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.service = mailConfig.service;
        this.email_username = mailConfig.email_address,
            this.email_password = mailConfig.email_password;
    }
    MailService.prototype.craftMailTemplate = function (mailBody) {
        return "\n        <body style=\" box-sizing: border-box;margin: 0;font-family: Verdana, Geneva, Tahoma, sans-serif;\">\n        <div>\n            <style>\n                body{\n                    box-sizing: border-box;\n                    margin: 0;\n                    font-family: Verdana, Geneva, Tahoma, sans-serif;\n       \n                }\n                \n            \n                .footerDiv{\n                    padding: 20px 10px;\n                    top: 0px;\n                    left: 0px;\n                    color: grey;\n                    background-color: black;\n                }\n        \n                .footerGridDiv h2{ \n                    padding-bottom: 12px;\n                }\n        \n                .footerGridDiv section {\n                    padding: 18px 10px;\n                }\n        \n        \n                .adminLink{\n                    text-decoration: none;\n                    color: inherit;\n                    display: inline-block\n                }\n                .footerDiv .contact a{\n                    text-decoration: none;\n                    color: black;\n                    display: block;\n                    transition: 0.5s linear;\n                    padding-bottom: 10px;\n                    color: inherit;\n                }\n                .footerDiv .contact a:hover{\n                    text-decoration: underline;\n                }\n                @media screen and (min-width: 767px){\n                    .footerGridDiv{\n                        display: grid;\n                        grid-template-columns: 40% 20% 20% 20%;\n                        justify-content: space-evenly;\n                    }\n        \n                    .footerGridDiv section {\n                        font-size: medium;\n                        border-bottom: 1px solid transparent;\n                    }\n        \n                    .footerDiv{\n                        display: flex;\n                        align-items: center;\n                    }\n                }\n                @media screen and (max-width: 767px){\n                    .footerGridDiv{\n                        display: grid;\n                        grid-template-columns: 100%;\n                        justify-content: space-evenly;\n                    }\n        \n                    \n                }\n                .heading{\n                    color: grey;\n                    box-shadow: 0px 0px 10px 0px rgb(222, 222, 222);\n                    border-radius: 20px;\n                    padding: 10px;\n                }\n                .main{\n                    max-width: 600px;\n                    margin: auto;\n                }\n            </style>\n            <div class=\"main\" style=\"max-width: 600px; margin: auto;\">\n            <div class=\"heading\" style=\"color: grey;\n                       box-shadow: 0px 0px 10px 0px rgb(222, 222, 222);\n                       border-radius: 20px;\n                       padding: 10px;\">\n                <h1 style=\"display: flex; justify-content: center; align-items: center; color: orange;\">\n                    <svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" height=\"2em\" width=\"2em\" ><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline></svg>\n                </h1>\n                <h1 style=\"display: flex; justify-content: center; align-items: center;\">\n                    Psychivity\n                    \n                </h1>\n                <p style=\"text-align: center\">\n                    Psychivity mail\n                </p>\n            </div>\n            <div style=\"display: flex; align-items: center; min-height: 250px;\">\n                " + mailBody + "\n            </div>\n            </div>\n        <br>\n        <div class=\"footerDiv style=\"padding: 20px 10px; top: 0px; left: 0px; color: grey; background-color: black; background: black;\">\n            <div class=\"footerGridDiv\">\n               \n                <section style=\"padding: 18px 10px;\">\n                    <h4>About</h4><br>\n                    <p>\n                    Psychivity \n                    </p>\n                </section>\n                <section class=\"contact\"><h4>Contact</h4><br>\n                   <p>\n                       <a target=\"_blank\" style=\"text-decoration: none;\n                       color: black;\n                       display: block;\n                       transition: 0.5s linear;\n                       padding-bottom: 10px;\n                       color: inherit;\">Send email</a></p><p>\n       \n                       <a style=\"text-decoration: none;\n                       color: black;\n                       display: block;\n                       transition: 0.5s linear;\n                       padding-bottom: 10px;\n                       color: inherit;\">\n                       Call +1 (0) 555 460 128</a>\n                   </p>\n                </section><section class=\"address\">\n                    <h2 style=\"padding-bottom: 12px;>Pyschivity</h2>\n                <a class=\"adminLink\" style=\"text-decoration: none; color: inherit; display: inline-block\">\n                    <p style=\"display: flex; align-items: center;\">\n                        Copyright &nbsp;\n                        <svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 1024 1024\" height=\"1em\" width=\"1em\" >\n                    <path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z\"></path>\n                    </svg>2023 | Pyschivity\n                    </p>\n                </a>\n                <p>All rights reserved.</p>\n            </section></div>\n        </div>\n        \n        </div>\n       </body>\n       ";
    };
    MailService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(mail_config_1.IIEmailConfig))
    ], MailService);
    return MailService;
}());
exports.MailService = MailService;
