import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiGetArchivedMessagesResponse,
    IWildduckApiRestoreMessageRequest,
    IWildduckApiRestoreMessageResponse,
    IWildduckApiRestoreMessagesRequest,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {IWildduckApiGetArchivedMessagesOptions} from "./archive.interface";

/**
 * Archive
 * @see https://docs.wildduck.email/api/#tag/Archive
 */
export class WildduckArchiveService extends WildduckClientComponent {

    /**
     * List archived messages
     * @see https://docs.wildduck.email/api/#operation/getArchivedMessages
     *
     * @param user - ID of the User
     * @param options
     */
    getArchivedMessages(user: string, options?: Partial<IWildduckApiGetArchivedMessagesOptions>): Promise<IWildduckApiGetArchivedMessagesResponse> {
        return new Promise<IWildduckApiGetArchivedMessagesResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/archived/messages', { params: { user }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Restore archived Message
     * @see https://docs.wildduck.email/api/#operation/restoreMessage
     *
     * @param user - ID of the user
     * @param message - Message ID
     * @param dto
     */
    restoreArchivedMessage(user: string, message: string, dto: IWildduckApiRestoreMessageRequest): Promise<IWildduckApiRestoreMessageResponse> {
        return new Promise<IWildduckApiRestoreMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/archived/messages/{message}/restore', { params: { user, message }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Restore archived messages
     * @description Initiates a restore task to move archived messages of a date range back to the mailboxes the messages were deleted from. If target mailbox does not exist, then the messages are moved to INBOX.
     * @see https://docs.wildduck.email/api/#operation/restoreMessages
     *
     * @param user - ID of the user
     * @param dto
     */
    restoreArchivedMessages(user: string, dto: IWildduckApiRestoreMessagesRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiRestoreMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/archived/restore', { params: { user }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}