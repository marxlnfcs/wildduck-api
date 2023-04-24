import {WildduckException} from "./http.exception";

export class WildduckTimeoutException extends WildduckException {
    constructor(url: string, stack: any){
        super(
            url,
            400,
            'Request timeout',
            { code: 'Timeout', error: 'Request timeout' },
            stack
        );
    }
}