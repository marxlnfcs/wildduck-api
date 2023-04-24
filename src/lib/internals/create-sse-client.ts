import {IWildduckClientOptions} from "../interfaces/client-options.interface";
import {HttpClient} from "./create-http-client";
import {isArray, isFunction, isNil, isString} from "lodash";
import {SSESource, SSESourceOptions} from "../interfaces/sse.interface";

/** @internal */
export function createSSEClient(options: IWildduckClientOptions, httpClient?: HttpClient): SSEClient {
    return new SSEClient(options, httpClient);
}

/** @internal */
export type SSEPathParams = { [key: string]: string|number|boolean|null|undefined };

/** @internal */
export class SSEClient {
    constructor(
        private options: IWildduckClientOptions,
        private http: HttpClient = new HttpClient(options),
    ){}

    create(path?: string, params?: SSEPathParams|null): SSESource {
        const url = this.http.createUrl(path, { params });
        const options: SSESourceOptions = {
            headers: {
                'X-Access-Token': this.options?.accessToken || '',
            },
            proxy: this.getProxy(),
            https: { rejectUnauthorized: this.options.rejectUnauthorized ?? true },
            rejectUnauthorized: this.options.rejectUnauthorized ?? true
        };
        if(isFunction(this.options?.onSSECreate)){
            this.options.onSSECreate(url, options);
        }
        return new EventSource(url, options);
    }

    private getProxy(): string|null {
        if(isNil(this.options.proxy) || isArray(this.options.proxy)) return null;
        if(isString(this.options.proxy)) return this.options.proxy
        if(this.options.proxy?.url) return this.options.proxy.url;
        return `${this.options.proxy.protocol || 'http'}://${this.options.proxy.host}:${this.options.proxy.port}`;
    }
}