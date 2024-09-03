import e from "express";

declare type Email = string;
declare type ID = string;

declare interface Request extends e.Request {
    body: {
        email: Email;
        password: string;
    };
}