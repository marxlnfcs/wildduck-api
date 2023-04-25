import {AxiosRequestConfig, AxiosResponse} from "axios";
import {SSESourceOptions} from "./sse.interface";

export interface IWildduckClientOptions {
    baseUrl: string;
    accessToken: string;
    timeout?: number;
    proxy?: IWildduckClientOptionsProxy|string;
    rejectUnauthorized?: boolean;
    onRequest?: (url: string, request: AxiosRequestConfig) => void;
    onResponse?: (url: string, response: AxiosResponse) => void;
    onError?: (url: string, request: AxiosRequestConfig, error: any) => void;
    onSSECreate?: (url: string, options: SSESourceOptions) => void;
}

export interface IWildduckClientOptionsProxy {
    protocol?: 'http'|'https';
    url?: string;
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
}