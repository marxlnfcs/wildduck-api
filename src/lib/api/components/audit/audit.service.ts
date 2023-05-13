import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateAuditRequest,
    IWildduckApiCreateAuditResponse,
    IWildduckApiGetAuditResponse
} from "../../client-schema";
import {AxiosError} from "axios";

/**
 * Audit
 * Auditing allows to monitor an email account. All existing, deleted and new emails are copied to the auditing system. See also https://github.com/nodemailer/wildduck-audit-manager
 * @see https://docs.wildduck.email/api/#tag/Audit
 */
export class WildduckAuditService extends WildduckClientComponent {

    /**
     * Request Audit Info
     * @description This method returns information about stored audit
     * @see https://docs.wildduck.email/api/#operation/getAudit
     *
     * @param audit - ID of the audit
     */
    getAudit(audit: string): Promise<IWildduckApiGetAuditResponse> {
        return new Promise<IWildduckApiGetAuditResponse>(async (resolve, reject) => {
            this.http.get('/audit/{audit}', { params: { audit } })
              .then(r => {
                  this.events.emitFromResponse(this.getAudit, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getAudit, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Export Audited Emails
     * @description This method returns a mailbox file that contains all audited emails
     * @see https://docs.wildduck.email/api/#operation/getAuditEmails
     *
     * @param audit - ID of the audit
     */
    getAuditEmails(audit: string): Promise<Buffer> {
        return new Promise<Buffer>(async (resolve, reject) => {
            this.http.download('/audit/{audit}/export.mbox', { method: 'GET', params: { audit } })
              .then(r => {
                  this.events.emitFromResponse(this.getAuditEmails, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getAuditEmails, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Create new audit
     * @description Initiates a message audit
     * @see https://docs.wildduck.email/api/#operation/createAudit
     *
     * @param dto
     */
    createAudit(dto: IWildduckApiCreateAuditRequest): Promise<IWildduckApiCreateAuditResponse> {
        return new Promise<IWildduckApiCreateAuditResponse>(async (resolve, reject) => {
            this.http.post('/audit', { body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.createAudit, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createAudit, e);
                  reject(createHttpException(e));
              })
        });
    }

}