import {AxiosRequestConfig, AxiosResponse} from "axios";

export interface IWildduckClientOptions {
    baseUrl: string;
    accessToken: string;
    timeout?: number;
    proxy?: IWildduckClientOptionsProxy|string;
    rejectUnauthorized?: boolean;
    onRequest?: (url: string, request: AxiosRequestConfig) => void;
    onResponse?: (url: string, request: AxiosResponse) => void;
    onError?: (url: string, error: any) => void;
    onSSECreate?: (url: string) => void;
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