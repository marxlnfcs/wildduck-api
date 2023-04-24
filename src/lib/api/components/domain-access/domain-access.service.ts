import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateAllowedDomainRequest,
    IWildduckApiCreateAllowedDomainResponse,
    IWildduckApiCreateBlockedDomainRequest,
    IWildduckApiCreateBlockedDomainResponse,
    IWildduckApiGetAllowedDomainResponse,
    IWildduckApiGetBlockedDomainResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";

/**
 * Domain Access
 * @see https://docs.wildduck.email/api/#tag/DomainAccess
 */
export class WildduckDomainAccessService extends WildduckClientComponent {

    /**
     * Delete a Domain from listing
     * @see https://docs.wildduck.email/api/#operation/deleteDomainListing
     *
     * @param domain - Listed domains unique ID
     */
    deleteDomainListing(domain: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/domainaccess/{domain}', { params: { domain } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List allowlisted domains
     * @see https://docs.wildduck.email/api/#operation/getAllowedDomain
     *
     * @param tag - Tag to look for
     */
    getAllowedDomains(tag: string): Promise<IWildduckApiGetAllowedDomainResponse> {
        return new Promise<IWildduckApiGetAllowedDomainResponse>(async (resolve, reject) => {
            this.http.get('/domainaccess/{tag}/allow', { params: { tag } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Add domain to allowlist
     * @see https://docs.wildduck.email/api/#operation/createAllowedDomain
     *
     * @param tag - Tag to look for
     * @param dto
     */
    addAllowedDomain(tag: string, dto: IWildduckApiCreateAllowedDomainRequest): Promise<IWildduckApiCreateAllowedDomainResponse> {
        return new Promise<IWildduckApiCreateAllowedDomainResponse>(async (resolve, reject) => {
            this.http.post('/domainaccess/{tag}/allow', { params: { tag }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List blocklisted domains
     * @see https://docs.wildduck.email/api/#operation/getBlockedDomain
     *
     * @param tag - Tag to look for
     */
    getBlockedDomains(tag: string): Promise<IWildduckApiGetBlockedDomainResponse> {
        return new Promise<IWildduckApiGetBlockedDomainResponse>(async (resolve, reject) => {
            this.http.post('/domainaccess/{tag}/block', { params: { tag } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Add domain to blocklist
     * @see https://docs.wildduck.email/api/#operation/createBlockedDomain
     *
     * @param tag - Tag to look for
     * @param dto
     */
    addBlockedDomain(tag: string, dto: IWildduckApiCreateBlockedDomainRequest): Promise<IWildduckApiCreateBlockedDomainResponse> {
        return new Promise<IWildduckApiCreateBlockedDomainResponse>(async (resolve, reject) => {
            this.http.post('/domainaccess/{tag}/block', { params: { tag }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}