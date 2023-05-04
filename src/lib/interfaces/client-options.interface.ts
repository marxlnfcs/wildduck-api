import {AxiosRequestConfig, AxiosResponse} from "axios";
import {SSESourceOptions} from "./sse.interface";

export interface IWildduckClientOptions {
    baseUrl: string;
    accessToken: string;
    timeout?: number;
    proxy?: IWildduckClientOptionsProxy|string;
    rejectUnauthorized?: boolean;
    onRequest?: (data: IWildduckClientOptionsOnRequestHandlerData) => void;
    onResponse?: (data: IWildduckClientOptionsOnResponseHandlerData) => void;
    onError?: (data: IWildduckClientOptionsOnErrorHandlerData) => void;
    onSSECreate?: (data: IWildduckClientOptionsOnSSECreateHandlerData) => void;
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

export interface IWildduckClientOptionsOnRequestHandlerData {
    url: string;
    request: AxiosRequestConfig;
    startDate: Date;
}

export interface IWildduckClientOptionsOnResponseHandlerData {
    url: string;
    request: AxiosRequestConfig;
    response: AxiosResponse;
    startDate: Date;
    endDate: Date;
    duration: number;
    durationString: string;
}

export interface IWildduckClientOptionsOnErrorHandlerData {
    url: string;
    request: AxiosRequestConfig;
    error: any;
    startDate: Date;
    endDate: Date;
    duration: number;
    durationString: string;
}

export interface IWildduckClientOptionsOnSSECreateHandlerData {
    url: string;
    sseOptions: SSESourceOptions;
}