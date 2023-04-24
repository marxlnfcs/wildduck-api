import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiGetTLSCertResult,
    IWildduckApiGetTLSCertsResponse,
    IWildduckApiResolveIdResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateTLSCertRequest,
    IWildduckApiUpdateTLSCertResponse
} from "../../client-schema";
import {IWildduckApiGetTLSCertsOptions} from "./certs.interface";

/**
 * Certs
 * @see https://docs.wildduck.email/api/#tag/Certs
 */
export class WildduckCertsService extends WildduckClientComponent {

    /**
     * Delete a TLS certificate
     * @see https://docs.wildduck.email/api/#operation/deleteTlsCert
     *
     * @param cert
     */
    deleteCertificate(cert: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/certs/{cert}', { params: { cert } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Request TLS certificate information
     * @see https://docs.wildduck.email/api/#operation/getTLSCerticate
     *
     * @param cert
     */
    getCertificate(cert: string): Promise<IWildduckApiGetTLSCertResult> {
        return new Promise<IWildduckApiGetTLSCertResult>(async (resolve, reject) => {
            this.http.get('/certs/{cert}', { params: { cert } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List registered TLS certificates
     * @see https://docs.wildduck.email/api/#operation/getTLSCerticates
     *
     * @param options
     */
    getCertificates(options: Partial<IWildduckApiGetTLSCertsOptions>): Promise<IWildduckApiGetTLSCertsResponse> {
        return new Promise<IWildduckApiGetTLSCertsResponse>(async (resolve, reject) => {
            this.http.get('/certs', { query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Create or update TLS certificate for server name
     * @description Add a new TLS certificate for a server name or update existing one. You can add a single certificate for each server name but SAN names are supported as well. For example you can add a sertificate for "mydomain.com" that includes "*.mydomain.com" in SAN and the same certificate would be used for requests that do not have it's own server name registered but match the SAN value.
     * @see https://docs.wildduck.email/api/#operation/updateTLSCertificate
     *
     * @param dto
     */
    setCertificate(dto: IWildduckApiUpdateTLSCertRequest): Promise<IWildduckApiUpdateTLSCertResponse> {
        return new Promise<IWildduckApiUpdateTLSCertResponse>(async (resolve, reject) => {
            this.http.post('/certs', { body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Resolve ID for a server name
     * @see https://docs.wildduck.email/api/#operation/resolveTLSCertificate
     *
     * @param serverName
     */
    resolveServerNameId(serverName: string): Promise<IWildduckApiResolveIdResponse> {
        return new Promise<IWildduckApiResolveIdResponse>(async (resolve, reject) => {
            this.http.get('/certs/resolve/{serverName}', { params: { serverName } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}