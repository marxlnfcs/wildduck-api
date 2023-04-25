import * as axios from "axios";
import {
    AxiosError,
    AxiosProxyConfig,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
    responseEncoding,
    ResponseType
} from "axios";
import {isUrl, joinUrlPaths, joinUrls} from "./utilities";
import {isFunction, isNil, isString} from "lodash";
import {IWildduckClientOptions} from "../interfaces/client-options.interface";
import {createInvalidProxyConfigException, createInvalidProxyUrlException} from "../exceptions/invalid-proxy.exception";
import {WildduckException} from "../exceptions/http.exception";
import {WildduckBadRequestException} from "../exceptions/bad-request.exception";
import {WildduckNotFoundException} from "../exceptions/not-found.exception";
import {WildduckTimeoutException} from "../exceptions/timeout.exception";
import {WildduckUnprocessableEntityException} from "../exceptions/unprocessable-entity.exception";
import {WildduckInternalServerErrorException} from "../exceptions/internal-server-error.exception";
import {WildduckUnknownErrorException} from "../exceptions/unknown-error.exception";
import * as https from "https";

/** @internal */
export function createHttpClient(options: IWildduckClientOptions): HttpClient {
    return new HttpClient(options);
}

/** @internal */
export interface HttpOptions<Body = any> {
    headers?: { [name: string]: string|number|null|undefined }|null;
    params?: { [key: string]: string|number|boolean|null|undefined }|null;
    query?: { [key: string]: string|number|boolean|null|undefined|Date|Array<string|number|boolean|null|undefined|Date> }|null;
    body?: Body|FormData|null;
    responseType?: ResponseType;
    responseEncoding?: responseEncoding|string;
}

/** @internal */
export type HttpResult<Result = any> = Promise<AxiosResponse<Result>>;

/** @internal */
export class HttpClient {
    private http = axios.default.create({
        headers: {
            'X-Access-Token': this.options?.accessToken || '',
        },
        timeout: this.options?.timeout,
        proxy: createHttpProxySettings(this.options)
    });

    constructor(
        private options: IWildduckClientOptions,
    ){}

    createUrl(path?: string, options?: Pick<HttpOptions, 'params'|'query'>): string {
        return this.buildRequestOptions('GET', path, options).url_full;
    }

    get<Response = any>(path?: string|string[], options?: Omit<HttpOptions, 'body'>): HttpResult<Response> {
        return this.request<Response>('GET', path, options);
    }
    post<Response = any>(path?: string|string[], options?: HttpOptions): HttpResult<Response> {
        return this.request<Response>('POST', path, options);
    }

    put<Response = any>(path?: string|string[], options?: HttpOptions): HttpResult<Response> {
        return this.request<Response>('PUT', path, options);
    }

    patch<Response = any>(path?: string|string[], options?: HttpOptions): HttpResult<Response> {
        return this.request<Response>('PATCH', path, options);
    }

    delete<Response = any>(path?: string|string[], options?: HttpOptions): HttpResult<Response> {
        return this.request<Response>('DELETE', path, options);
    }

    download(path?: string|string[], options?: { method?: Method } & HttpOptions): HttpResult<Buffer> {
        const request = this.buildRequestOptions(options?.method || 'GET', path, options);
        return this.http.request({ ...request, responseType: 'blob' });
    }

    upload<Response = any>(path?: string|string[], options?: { method?: Method } & HttpOptions): HttpResult<Response> {
        const request = this.buildRequestOptions(options?.method || 'GET', path, options);
        return this.http.request(request);
    }

    request<Response = any>(method: Method, path?: string|string[], options?: HttpOptions): HttpResult<Response> {
        const request = this.buildRequestOptions(method, path, options);
        this.onRequest(request.url_full, request);
        return this.http.request(request)
            .then(response => {
                this.onResponse(request.url_full, request, response);
                return response;
            })
            .catch((error) => {
                this.onError(request.url_full, error);
                throw error;
            })
    }

    /** Logging functions */
    private onRequest(url: string, request: AxiosRequestConfig): void {
        if(isFunction(this.options?.onRequest)) this.options?.onRequest(url, request);
    }
    private onResponse(url: string, request: AxiosRequestConfig, response: AxiosResponse): void {
        if(isFunction(this.options?.onResponse)) this.options?.onResponse(url, request, response);
    }
    private onError(url: string, error: any): void {
        if(isFunction(this.options?.onError)) this.options?.onError(url, error);
    }

    /** Returns the http options */
    private buildRequestOptions(method: Method, path?: string|string[], options?: HttpOptions): AxiosRequestConfig & { url_full: string } {

        // sets the default options object
        options = {
            ...(options || {}),
            headers: options?.headers || null,
            params: options?.params || null,
            query: options?.query || null,
            body: options?.body || null,
        };

        // join paths
        const paths = joinUrlPaths(...(path ? Array.isArray(path) ? path : [path] : []));

        // build url
        let url = isUrl(paths) ? paths : joinUrls(this.options.baseUrl, ...[paths]);

        // define httpHeaders
        let headers = {};

        // set headers
        if(options?.headers){
            Object
                .entries(options.headers)
                .map(([headerName, headerValue]) => headers[headerName] = headerValue);
        }

        // replace params in url
        if(options.params){
            Object
                .entries(options.params)
                .filter(([key, value]) => !isNil(value))
                .map(([key, value]) => url = url.replace(`:${key}`, `${value}`).replace(`{${key}}`, `${value}`))
        }

        // format query
        if(options.query){
            const query = options.query;
            options.query = {};

            for(let [key, value] of Object.entries(query).filter(([key, value]) => !isNil(value))){
                options.query[key] = Array.isArray(value) ? value.join(',') : value;
                if(!options.query[key]){
                    delete options.query[key];
                }
            }
        }

        // set full url
        let url_full = !options.query ? url : `${url}?${Object.entries(options.query).map(e => `${e[0]}=${e[1]}`).join('?')}`

        // return options
        return {
            method: method,
            url: url,
            url_full: url_full,
            headers: headers,
            data: options?.body,
            responseType: options?.responseType,
            responseEncoding: options?.responseEncoding,
            httpsAgent: new https.Agent({ rejectUnauthorized: this.options.rejectUnauthorized }),
            params: (options?.query || {}) as any,
        };

    }

}

/** @internal */
export function createHttpProxySettings(options: IWildduckClientOptions): AxiosProxyConfig|false {

    // check if proxy url or host is defined
    if(typeof options?.proxy !== 'string' && !options?.proxy?.url && !options?.proxy?.host){
        return false;
    }

    // parse proxy url if available
    if(isString(options.proxy) || options?.proxy?.url){
        try{
            const url = new URL(isString(options.proxy) ? options.proxy : options.proxy.url);
            return {
                host: url.hostname,
                port: parseInt(url.port),
                protocol: url.protocol + ':',
                auth: !isString(options?.proxy) ? options?.proxy?.auth : null
            }
        }catch(e){
            throw createInvalidProxyUrlException(isString(options.proxy) ? options.proxy : options.proxy.url);
        }
    }

    // check if host, port and protocol are defined
    if(!options.proxy?.host || !options.proxy?.port || !options.proxy?.protocol){
        throw createInvalidProxyConfigException(options as IWildduckClientOptions);
    }

    // return proxy config
    return {
        host: options.proxy.host,
        port: options.proxy.port,
        protocol: options.proxy.protocol + ':',
        auth: options.proxy.auth
    }

}

/** @internal */
export function createHttpException(e: AxiosError): WildduckException {

    // define error defaults
    let [url, status, data] = [e?.config?.url, null, null, null];

    // check if axios response is available
    if (e?.response) {
        status = e.response.status;
        data = e.response.data || null;
    }else if(e?.request){
        status = 408;
    }

    // create exceptions
    switch(status){
        case 400: return new WildduckBadRequestException(url, data, e?.stack);
        case 404: return new WildduckNotFoundException(url, data, e?.stack);
        case 408: return new WildduckTimeoutException(url, e?.stack);
        case 422: return new WildduckUnprocessableEntityException(url, data, e?.stack);
        case 500: return new WildduckInternalServerErrorException(url, data, e?.stack);
        default: return new WildduckUnknownErrorException(url, data, e?.stack);
    }

}