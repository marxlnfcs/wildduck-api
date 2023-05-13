import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateMailboxRequest,
    IWildduckApiCreateMailboxResponse,
    IWildduckApiGetMailboxesResponse,
    IWildduckApiGetMailboxResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateMailboxRequest
} from "../../client-schema";
import {IWildduckApiGetMailboxesOptions} from "./mailboxes.interface";
import {AxiosError} from "axios";

/**
 * Mailboxes
 * @see https://docs.wildduck.email/api/#tag/Mailboxes
 */
export class WildduckMailboxesService extends WildduckClientComponent {

    /**
     * Delete an mailbox
     * @see https://docs.wildduck.email/api/#operation/deleteMailbox
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     */
    deleteMailbox(user: string, mailbox: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/mailboxes/{mailbox}', { params: { user, mailbox } })
              .then(r => {
                  this.events.emitFromResponse(this.deleteMailbox, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteMailbox, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request Mailbox information
     * @see https://docs.wildduck.email/api/#operation/getMailbox
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     */
    getMailbox(user: string, mailbox: string): Promise<IWildduckApiGetMailboxResponse> {
        return new Promise<IWildduckApiGetMailboxResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/mailboxes/{mailbox}', { params: { user, mailbox } })
              .then(r => {
                  this.events.emitFromResponse(this.getMailbox, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getMailbox, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request Mailbox information
     * @see https://docs.wildduck.email/api/#operation/getMailbox
     *
     * @param user - ID of the user
     * @param mailbox - ID of the mailbox
     * @param dto
     */
    updateMailbox(user: string, mailbox: string, dto: IWildduckApiUpdateMailboxRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/mailboxes/{mailbox}', { params: { user, mailbox }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.updateMailbox, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.updateMailbox, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List Mailboxes for a User
     * @see https://docs.wildduck.email/api/#operation/getMailboxes
     *
     * @param user - ID of the user
     * @param options
     */
    getMailboxes(user: string, options?: Partial<IWildduckApiGetMailboxesOptions>): Promise<IWildduckApiGetMailboxesResponse> {
        return new Promise<IWildduckApiGetMailboxesResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/mailboxes', { params: { user }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getMailboxes, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getMailboxes, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Create new Mailbox
     * @see https://docs.wildduck.email/api/#operation/createMailbox
     *
     * @param user - ID of the user
     * @param dto
     */
    createMailbox(user: string, dto: IWildduckApiCreateMailboxRequest): Promise<IWildduckApiCreateMailboxResponse> {
        return new Promise<IWildduckApiCreateMailboxResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/mailboxes', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.createMailbox, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createMailbox, e);
                  reject(createHttpException(e));
              })
        });
    }

}