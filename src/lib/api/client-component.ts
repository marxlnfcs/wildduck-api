import {HttpClient} from "../internals/create-http-client";
import {SSEClient} from "../internals/create-sse-client";
import {EventClient} from "../internals/create-event-client";

export class WildduckClientComponent {
    constructor(
        protected http: HttpClient,
        protected sse: SSEClient,
        protected events: EventClient,
    ){}
}