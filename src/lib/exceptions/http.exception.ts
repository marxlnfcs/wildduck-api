import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckException extends Error {
    url: string|null;
    status: number;
    statusMessage: string;
    error: string;
    code: string;
    details: any;

    constructor(url: string, status: number, statusMessage: string, error: IWildduckHttpError, stack: any) {

        // set error message
        super(error?.error);

        // set information
        this.url = url;
        this.status = status;
        this.statusMessage = statusMessage;
        this.error = error.error;
        this.code = error.code;
        this.details = error.details || {};

        // set stack if available
        if(stack){
            this.stack = stack;
        }

    }
}