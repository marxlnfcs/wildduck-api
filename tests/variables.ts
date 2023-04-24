import {createWildduckClient} from "../src";

export const CLIENT = createWildduckClient({
    baseUrl: process.env.WD_API_URL,
    accessToken: process.env.WD_API_ACCESS_TOKEN,
    rejectUnauthorized: false
});

export function throwError(e: Error): null {
    console.log(e);
    throw e;
}