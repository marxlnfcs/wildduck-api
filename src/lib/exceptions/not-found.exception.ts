import {WildduckException} from "./http.exception";
import {IWildduckHttpError} from "../interfaces/http.interface";

export class WildduckNotFoundException extends WildduckException {
    constructor(url: string, error: IWildduckHttpError, stack: any){
        super(
            url,
            404,
            'Requested item was not found',
            error,
            stack
        );
    }
}