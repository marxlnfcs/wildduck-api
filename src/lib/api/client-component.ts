import {HttpClient} from "../internals/create-http-client";
import {SSEClient} from "../internals/create-sse-client";

export class WildduckClientComponent {
    constructor(
        protected http: HttpClient,
        protected sse: SSEClient,
    ){}
}