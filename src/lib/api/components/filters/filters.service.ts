import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateFilterRequest,
    IWildduckApiGetAllFiltersResponse,
    IWildduckApiGetFilterResponse,
    IWildduckApiGetFiltersResponse,
    IWildduckApiResolveIdResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateFilterRequest,
    IWildduckApiUpdateFilterResponse
} from "../../client-schema";
import {IWildduckApiGetAllFiltersOptions} from "./filters.interface";

/**
 * Filters
 * @see https://docs.wildduck.email/api/#tag/Filters
 */
export class WildduckFiltersService extends WildduckClientComponent {

    /**
     * Delete an filter
     * @see https://docs.wildduck.email/api/#operation/deleteFilter
     *
     * @param user - ID of the user
     * @param filter - ID of the filter
     */
    deleteFilter(user: string, filter: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/filters/{filter}', { params: { user, filter } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Request Filter information
     * @see https://docs.wildduck.email/api/#operation/getFilter
     *
     * @param user - ID of the user
     * @param filter - ID of the filter
     */
    getFilter(user: string, filter: string): Promise<IWildduckApiGetFilterResponse> {
        return new Promise<IWildduckApiGetFilterResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/filters/{filter}', { params: { user, filter } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Update Filter information
     * @description This method updates Filter data. To unset a value, use empty strings
     * @see https://docs.wildduck.email/api/#operation/updateFilter
     *
     * @param user - ID of the user
     * @param filter - ID of the filter
     * @param dto
     */
    updateFilter(user: string, filter: string, dto: IWildduckApiUpdateFilterRequest): Promise<IWildduckApiUpdateFilterResponse> {
        return new Promise<IWildduckApiUpdateFilterResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/filters/{filter}', { params: { user, filter }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List all Filters
     * @see https://docs.wildduck.email/api/#operation/getAllFilters
     *
     * @param options
     */
    getFilters(options?: Partial<IWildduckApiGetAllFiltersOptions>): Promise<IWildduckApiGetAllFiltersResponse> {
        return new Promise<IWildduckApiGetAllFiltersResponse>(async (resolve, reject) => {
            this.http.get('/filters', { query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List Filters for a User
     * @see https://docs.wildduck.email/api/#operation/getFilters
     *
     * @param user - ID of the user
     */
    getUserFilters(user: string): Promise<IWildduckApiGetFiltersResponse> {
        return new Promise<IWildduckApiGetFiltersResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/filters', { params: { user } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Create new Filter
     * @see https://docs.wildduck.email/api/#operation/createFilter
     *
     * @param user - ID of the user
     * @param dto
     */
    createUserFilter(user: string, dto: IWildduckApiCreateFilterRequest): Promise<IWildduckApiResolveIdResponse> {
        return new Promise<IWildduckApiResolveIdResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/filters', { params: { user }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}