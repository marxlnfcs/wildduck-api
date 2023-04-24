import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiDeleteMessagesInMailboxResponse,
    IWildduckApiForwardStoredMessageRequest,
    IWildduckApiForwardStoredMessageResponse,
    IWildduckApiGetMessageResponse,
    IWildduckApiGetMessagesResponse,
    IWildduckApiSearchMessagesResponse,
    IWildduckApiSubmitStoredMessageRequest,
    IWildduckApiSubmitStoredMessageResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateMessageRequest,
    IWildduckApiUpdateMessageResponse,
    IWildduckApiUploadMessageRequest,
    IWildduckApiUploadMessageResponse
} from "../../client-schema";
import {
    IWildduckApiDeleteMessagesInMailboxOptions,
    IWildduckApiGetMessageOptions,
    IWildduckApiGetMessagesOptions,
    IWildduckApiSearchMessagesOptions
} from "./messages.interface";

/**
 * Messages
 * @see https://docs.wildduck.email/api/#tag/Messages
 */
export class WildduckMessagesService extends WildduckClientComponent {

    /**
     * Delete a message
     * @see https://docs.wildduck.email/api/#operation/deleteMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     */
    deleteMessage(user: string, mailbox: string, message: number): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/mailboxes/{mailbox}/messages/{message}', { params: { user, mailbox, message } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Request Message information
     * @see https://docs.wildduck.email/api/#operation/getMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     * @param options
     */
    getMessage(user: string, mailbox: string, message: number, options?: Partial<IWildduckApiGetMessageOptions>): Promise<IWildduckApiGetMessageResponse> {
        return new Promise<IWildduckApiGetMessageResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/mailboxes/{mailbox}/messages/{message}', { params: { user, mailbox, message }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Delete all Messages from a Mailbox
     * @see https://docs.wildduck.email/api/#operation/deleteMessagesInMailbox
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param options
     */
    deleteMessagesInMailbox(user: string, mailbox: string, options?: Partial<IWildduckApiDeleteMessagesInMailboxOptions>): Promise<IWildduckApiDeleteMessagesInMailboxResponse> {
        return new Promise<IWildduckApiDeleteMessagesInMailboxResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/mailboxes/{mailbox}/messages', { params: { user, mailbox }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List messages in a Mailbox
     * @see https://docs.wildduck.email/api/#operation/getMessages
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param options
     */
    getMessagesInMailbox(user: string, mailbox: string, options?: Partial<IWildduckApiGetMessagesOptions>): Promise<IWildduckApiGetMessagesResponse> {
        return new Promise<IWildduckApiGetMessagesResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/mailboxes/{mailbox}/messages', { params: { user, mailbox }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Update Message information
     * @see https://docs.wildduck.email/api/#operation/updateMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param dto
     */
    updateMessage(user: string, mailbox: string, dto: IWildduckApiUpdateMessageRequest): Promise<IWildduckApiUpdateMessageResponse> {
        return new Promise<IWildduckApiUpdateMessageResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/mailboxes/{mailbox}/messages', { params: { user, mailbox }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Upload Message
     * @see https://docs.wildduck.email/api/#operation/uploadMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param dto
     */
    uploadMessage(user: string, mailbox: string, dto: IWildduckApiUploadMessageRequest): Promise<IWildduckApiUploadMessageResponse> {
        return new Promise<IWildduckApiUploadMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/mailboxes/{mailbox}/messages', { params: { user, mailbox }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Forward stored Message
     * @description This method allows either to re-forward a message to an original forward target or forward it to some other address. This is useful if a user had forwarding turned on but the message was not delivered so you can try again. Forwarding does not modify the original message.
     * @see https://docs.wildduck.email/api/#operation/forwardStoredMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     * @param dto
     */
    forwardMessage(user: string, mailbox: string, message: string, dto: IWildduckApiForwardStoredMessageRequest): Promise<IWildduckApiForwardStoredMessageResponse> {
        return new Promise<IWildduckApiForwardStoredMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/mailboxes/{mailbox}/messages/{message}/forward', { params: { user, mailbox, message }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Download Attachment
     * @description This method returns attachment file contents in binary form
     * @see https://docs.wildduck.email/api/#operation/getMessageAttachment
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     * @param attachment - ID of the attachment
     */
    downloadAttachment(user: string, mailbox: string, message: string, attachment: string): Promise<Buffer> {
        return new Promise<Buffer>(async (resolve, reject) => {
            this.http.download('/users/{user}/mailboxes/{mailbox}/messages/{message}/attachments/{attachment}', { params: { user, mailbox, message, attachment } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Get Message source
     * @description This method returns the full RFC822 formatted source of the stored message
     * @see https://docs.wildduck.email/api/#operation/getMessageSource
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     */
    getMessageSource(user: string, mailbox: string, message: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            this.http.get('/users/{user}/mailboxes/{mailbox}/messages/{message}/message.eml', { params: { user, mailbox, message }, responseType: 'text' })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Delete an Outbound Message
     * @description You can delete outbound emails that are still in queue. Queue ID can be found from the outbound property of a stored email.
     * @see https://docs.wildduck.email/api/#operation/deleteOutboundMessage
     *
     * @param user - ID of the user
     * @param queueId - Outbound queue id of the message
     */
    deleteOutboundMessage(user: string, queueId: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/outbound/{queueId}', { params: { user, queueId } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Search for messages
     * @description This method allows searching for matching messages.
     * @see https://docs.wildduck.email/api/#operation/searchMessages
     *
     * @param user - ID of the user
     * @param options
     */
    searchMessages(user: string, options?: Partial<IWildduckApiSearchMessagesOptions>): Promise<IWildduckApiSearchMessagesResponse> {
        return new Promise<IWildduckApiSearchMessagesResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/search', { params: { user }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Search and update messages
     * @description This method allows applying an action to all matching messages. This is an async method so that it will return immediately. Actual modifications are run in the background.
     * @see https://docs.wildduck.email/api/#operation/searchApplyMessages
     *
     * @param user - ID of the user
     * @param dto
     * @param options
     */
    searchAndUpdateMessages(user: string, dto: any, options?: Partial<IWildduckApiSearchMessagesOptions>): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.http.post('/users/{user}/search', { params: { user }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Submit Draft for delivery
     * @description This method allows to submit a draft message for delivery. Draft is moved to Sent mail folder.
     * @see https://docs.wildduck.email/api/#operation/submitStoredMessage
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param message - ID of the message
     * @param dto
     */
    submitDraftForDelivery(user: string, mailbox: string, message: string, dto: IWildduckApiSubmitStoredMessageRequest): Promise<IWildduckApiSubmitStoredMessageResponse> {
        return new Promise<IWildduckApiSubmitStoredMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/mailboxes/{mailbox}/messages/{message}/submit', { params: { user, mailbox, message }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}