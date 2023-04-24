import {IWildduckClientOptions} from "../interfaces/client-options.interface";

export class InvalidProxyUrlException extends Error {
    constructor(public url: string){
        super(`The proxy url "${url}" is not valid`);
    }
}

export class InvalidProxyConfigException extends Error {
    constructor(public config: IWildduckClientOptions){
        super(`The provided proxy config is not valid.`);
    }
}

/** @internal */
export const createInvalidProxyUrlException = (url: string) => new InvalidProxyUrlException(url);

/** @internal */
export const createInvalidProxyConfigException = (config: IWildduckClientOptions) => new InvalidProxyConfigException(config);