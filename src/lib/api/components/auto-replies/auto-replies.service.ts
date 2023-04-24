import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiGetAutoreplyResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateAutoreplyRequest
} from "../../client-schema";

/**
 * Auto Replies
 * @see https://docs.wildduck.email/api/#tag/Autoreplies
 */
export class WildduckAutoRepliesService extends WildduckClientComponent {

    /**
     * Delete AutoReply information
     * @see https://docs.wildduck.email/api/#operation/deleteAutoreply
     *
     * @param user - ID of the user
     */
    deleteAutoReply(user: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/autoreply', { params: { user } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Get AutoReply information
     * @see https://docs.wildduck.email/api/#operation/getAutoreply
     *
     * @param user - ID of the user
     */
    getAutoReply(user: string): Promise<IWildduckApiGetAutoreplyResponse> {
        return new Promise<IWildduckApiGetAutoreplyResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/autoreply', { params: { user } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Update AutoReply information
     * @see https://docs.wildduck.email/api/#operation/updateAutoreply
     *
     * @param user - ID of the user
     * @param dto
     */
    updateAutoReply(user: string, dto: IWildduckApiUpdateAutoreplyRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/autoreply', { params: { user }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}