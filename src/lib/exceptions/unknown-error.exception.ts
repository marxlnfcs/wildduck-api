import {WildduckException} from "./http.exception";
import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckUnknownErrorException extends WildduckException {
    constructor(url: string, error: IWildduckHttpError, stack: any){
        super(
            url,
            900,
            'Unknown error',
            error || { code: 'UnknownError', error: 'Unknown error' },
            stack
        );
    }
}