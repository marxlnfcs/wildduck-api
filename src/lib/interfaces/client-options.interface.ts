export interface IWildduckClientOptions {
    baseUrl: string;
    accessToken: string;
    timeout?: number;
    proxy?: IWildduckClientOptionsProxy|string;
    rejectUnauthorized?: boolean;
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