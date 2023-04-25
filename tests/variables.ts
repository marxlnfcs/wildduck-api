import {createWildduckClient} from "../src";

export const CLIENT = createWildduckClient({
    baseUrl: process.env.WD_API_URL,
    accessToken: process.env.WD_API_ACCESS_TOKEN,
    rejectUnauthorized: false,
    onRequest: (url, request) => {
        console.log(`${request.method} ${url}`);
    },
    onResponse: (url, request, response) => {
        console.log(`${request.method} ${url}: ${response.status} - ${response.statusText}`);
    },
    onError: (url, request, error) => {
        console.log(`${request.method} ${url}: Error - ${error.message}`);
    },
    onSSECreate: (url, options) => {
        console.log(`SSE ${url}: `, options);
    }
});

export function throwError(e: Error): null {
    console.log(e);
    throw e;
}