import {createWildduckClient} from "../src";

export const CLIENT = createWildduckClient({
    baseUrl: process.env.WD_API_URL,
    accessToken: process.env.WD_API_ACCESS_TOKEN,
    rejectUnauthorized: false,
    delay: 2000,
    onRequest: (data) => {
        //console.log(`${data.request.method} ${data.url}`);
    },
    onResponse: (data) => {
        //console.log(`${data.request.method} ${data.url}: ${data.response.status} - ${data.response.statusText} - ${data.duration} - ${data.durationString}`);
    },
    onError: (data) => {
        //console.log(`${data.request.method} ${data.url}: Error - ${data.error.message} - ${data.duration} - ${data.durationString}`);
    },
    onSSECreate: (data) => {
        //console.log(`SSE ${data.url}: `, data.sseOptions);
    }
});

export function throwError(e: Error): null {
    console.log(e);
    throw e;
}