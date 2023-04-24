import {IWildduckClientOptions} from "./interfaces/client-options.interface";
import {WildduckClient} from "./api/client";

export function createWildduckClient(options?: IWildduckClientOptions) {
    return new WildduckClient(options);
}