import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiGetDkimKeyResponse,
    IWildduckApiGetDkimKeysResponse,
    IWildduckApiResolveIdResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateDkimKeyRequest,
    IWildduckApiUpdateDkimKeyResponse
} from "../../client-schema";
import {IWildduckApiGetDkimKeysOptions} from "./dkim.interface";
import {AxiosError} from "axios";

/**
 * DKIM
 * @see https://docs.wildduck.email/api/#tag/DKIM
 */
export class WildduckDKIMService extends WildduckClientComponent {

    /**
     * Delete a DKIM key
     * @see https://docs.wildduck.email/api/#operation/deleteDkimKey
     *
     * @param dkim - ID of the DKIM
     */
    deleteDKIM(dkim: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/dkim/{dkim}', { params: { dkim } })
              .then(r => {
                  this.events.emitFromResponse(this.deleteDKIM, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteDKIM, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request DKIM information
     * @see https://docs.wildduck.email/api/#operation/getDkimKey
     *
     * @param dkim - ID of the DKIM
     */
    getDKIM(dkim: string): Promise<IWildduckApiGetDkimKeyResponse> {
        return new Promise<IWildduckApiGetDkimKeyResponse>(async (resolve, reject) => {
            this.http.get('/dkim/{dkim}', { params: { dkim } })
              .then(r => {
                  this.events.emitFromResponse(this.getDKIM, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getDKIM, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List registered DKIM keys
     * @see https://docs.wildduck.email/api/#operation/getDkimKey
     *
     * @param options
     */
    getDKIMs(options?: Partial<IWildduckApiGetDkimKeysOptions>): Promise<IWildduckApiGetDkimKeysResponse> {
        return new Promise<IWildduckApiGetDkimKeysResponse>(async (resolve, reject) => {
            this.http.get('/dkim', { query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getDKIMs, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getDKIMs, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List registered DKIM keys
     * @see https://docs.wildduck.email/api/#operation/getDkimKey
     *
     * @param dto
     */
    setDKIM(dto: IWildduckApiUpdateDkimKeyRequest): Promise<IWildduckApiUpdateDkimKeyResponse> {
        return new Promise<IWildduckApiUpdateDkimKeyResponse>(async (resolve, reject) => {
            this.http.post('/dkim', { body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.setDKIM, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.setDKIM, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List registered DKIM keys
     * @see https://docs.wildduck.email/api/#operation/getDkimKey
     *
     * @param domain
     */
    resolveDKIM(domain: string): Promise<IWildduckApiResolveIdResponse> {
        return new Promise<IWildduckApiResolveIdResponse>(async (resolve, reject) => {
            this.http.get('/dkim/resolve/{domain}', { params: { domain } })
              .then(r => {
                  this.events.emitFromResponse(this.resolveDKIM, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.resolveDKIM, e);
                  reject(createHttpException(e));
              })
        });
    }

}