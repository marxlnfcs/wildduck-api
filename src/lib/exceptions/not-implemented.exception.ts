import {WildduckException} from "./http.exception";

export class WildduckNotImplementedException extends WildduckException {
    constructor(url: string, stack?: any){
        super(
            url,
            501,
            'Not implemented',
            { code: 'NotImplemented', error: 'Not implemented' },
            stack
        );
    }
}