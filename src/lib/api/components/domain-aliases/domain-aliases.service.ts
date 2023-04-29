import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateDomainAliasRequest,
    IWildduckApiCreateDomainAliasResponse,
    IWildduckApiGetDomainAliasesResponse,
    IWildduckApiGetDomainAliasResponse,
    IWildduckApiResolveIdResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {IWildduckApiGetDomainAliasesOptions} from "./domain-aliases.interface";

/**
 * Domain Aliases
 * @see https://docs.wildduck.email/api/#tag/DomainAliases
 */
export class WildduckDomainAliasesService extends WildduckClientComponent {

    /**
     * Delete an Alias
     * @see https://docs.wildduck.email/api/#operation/deleteDomainAlias
     *
     * @param alias - ID of the alias
     */
    deleteAlias(alias: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/domainaliases/{alias}', { params: { alias } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Request Alias information
     * @see https://docs.wildduck.email/api/#operation/getDomainAlias
     *
     * @param alias - ID of the alias
     */
    getAlias(alias: string): Promise<IWildduckApiGetDomainAliasResponse> {
        return new Promise<IWildduckApiGetDomainAliasResponse>(async (resolve, reject) => {
            this.http.delete('/domainaliases/{alias}', { params: { alias } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List registered Domain Aliases
     * @see https://docs.wildduck.email/api/#operation/getDomainAlias
     *
     * @param options
     */
    getAliases(options?: Partial<IWildduckApiGetDomainAliasesOptions>): Promise<IWildduckApiGetDomainAliasesResponse> {
        return new Promise<IWildduckApiGetDomainAliasesResponse>(async (resolve, reject) => {
            this.http.get('/domainaliases', { query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Create new Domain Alias
     * @description Add a new Alias for a Domain. This allows to accept mail on username@domain and username@alias
     * @see https://docs.wildduck.email/api/#operation/createDomainAlias
     *
     * @param dto
     */
    createAlias(dto: IWildduckApiCreateDomainAliasRequest): Promise<IWildduckApiCreateDomainAliasResponse> {
        return new Promise<IWildduckApiCreateDomainAliasResponse>(async (resolve, reject) => {
            this.http.post('/domainaliases', { body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Resolve ID for a domain alias
     * @see https://docs.wildduck.email/api/#operation/resolveDomainAlias
     *
     * @param alias - Alias domain
     */
    resolveAlias(alias: string): Promise<IWildduckApiResolveIdResponse> {
        return new Promise<IWildduckApiResolveIdResponse>(async (resolve, reject) => {
            this.http.post('/domainaliases/resolve/{alias}', { params: { alias } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}