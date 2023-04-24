import {WildduckException} from "./http.exception";
import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckBadRequestException extends WildduckException {
    constructor(url: string, error: IWildduckHttpError, stack: any){
        super(
            url,
            400,
            'The supplied request was not valid',
            error,
            stack
        );
    }
}