import {WildduckException} from "./http.exception";
import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckInternalServerErrorException extends WildduckException {
    constructor(url: string, error: IWildduckHttpError, stack: any){
        super(
            url,
            500,
            'Internal server error',
            error,
            stack
        );
    }
}