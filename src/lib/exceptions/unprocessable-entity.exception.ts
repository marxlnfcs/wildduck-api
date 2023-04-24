import {WildduckException} from "./http.exception";
import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckUnprocessableEntityException extends WildduckException {
    constructor(url: string, error: IWildduckHttpError, stack: any){
        super(
            url,
            422,
            'The input to the operation was not valid',
            error,
            stack
        );
    }
}