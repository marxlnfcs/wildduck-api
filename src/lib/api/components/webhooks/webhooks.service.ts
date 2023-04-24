import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateWebhookRequest,
    IWildduckApiCreateWebhookResponse,
    IWildduckApiGetWebhooksResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {IWildduckApiGetWebhooksOptions} from "./webhooks.interface";

/**
 * Webhooks
 * @see https://docs.wildduck.email/api/#tag/Webhooks
 */
export class WildduckWebhooksService extends WildduckClientComponent {

    /**
     * Delete a webhook
     * @see https://docs.wildduck.email/api/#operation/deleteWebhook
     *
     * @param webhook - ID of the webhook
     */
    deleteWebhook(webhook: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/webhooks/{webhook}', { params: { webhook } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List registered Webhooks
     * @see https://docs.wildduck.email/api/#operation/getWebhooks
     *
     * @param type - Prefix or exact match. Prefix match must end with ".*", eg "channel.*". Use "*" for all types
     * @param options
     */
    getWebhooks(type: string, options?: Partial<IWildduckApiGetWebhooksOptions>): Promise<IWildduckApiGetWebhooksResponse> {
        return new Promise<IWildduckApiGetWebhooksResponse>(async (resolve, reject) => {
            this.http.get('/webhooks', { query: { type, ...(options || {}) } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Create new Webhook
     * @see https://docs.wildduck.email/api/#operation/createWebhook
     *
     */
    createWebhook(dto: IWildduckApiCreateWebhookRequest): Promise<IWildduckApiCreateWebhookResponse> {
        return new Promise<IWildduckApiCreateWebhookResponse>(async (resolve, reject) => {
            this.http.post('/webhooks', { body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}