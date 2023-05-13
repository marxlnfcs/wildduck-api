import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateForwardedAddressRequest,
    IWildduckApiCreateForwardedAddressResponse,
    IWildduckApiCreateUserAddressRequest,
    IWildduckApiCreateUserAddressResponse,
    IWildduckApiGetAddressesResponse,
    IWildduckApiGetForwardedAddressResponse,
    IWildduckApiGetUserAddressesregisterResponse,
    IWildduckApiGetUserAddressesResponse,
    IWildduckApiGetUserAddressResponse,
    IWildduckApiRenameDomainRequest,
    IWildduckApiResolveAddressResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateForwardedAddressRequest,
    IWildduckApiUpdateUserAddressRequest
} from "../../client-schema";
import {
    IWildduckApiGetAddressesOptions,
    IWildduckApiGetUserAddressesOptions,
    IWildduckApiGetUserAddressesregisterOptions,
    IWildduckApiResolveAddressOptions
} from "./addresses.interface";
import {AxiosError} from "axios";

/**
 * Addresses
 * @see https://docs.wildduck.email/api/#tag/Addresses
 */
export class WildduckAddressesService extends WildduckClientComponent {

    /**
     * Delete a forwarded address
     * @see https://docs.wildduck.email/api/#operation/deleteForwardedAddress
     *
     * @param address - ID of the address
     */
    deleteForwardedAddress(address: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/addresses/forwarded/{address}', { params: { address } })
                .then(r => {
                    this.events.emitFromResponse(this.deleteForwardedAddress, r);
                    resolve(r.data);
                })
                .catch((e: AxiosError) => {
                    this.events.emitFromError(this.deleteForwardedAddress, e);
                    reject(createHttpException(e));
                })
        });
    }

    /**
     * Request forwarded Addresses information
     * @see https://docs.wildduck.email/api/#operation/getForwardedAddress
     *
     * @param address - ID of the address
     */
    getForwardedAddress(address: string): Promise<IWildduckApiGetForwardedAddressResponse> {
        return new Promise<IWildduckApiGetForwardedAddressResponse>((resolve, reject) => {
            this.http.get('/addresses/forwarded/{address}', { params: { address } })
              .then(r => {
                  this.events.emitFromResponse(this.getForwardedAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getForwardedAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Update forwarded Address information
     * @see https://docs.wildduck.email/api/#operation/updateForwardedAddress
     *
     * @param address - ID of the address
     * @param dto
     */
    updateForwardedAddress(address: string, dto: IWildduckApiUpdateForwardedAddressRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>((resolve, reject) => {
            this.http.put('/addresses/forwarded/{address}', { params: { address }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.updateForwardedAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.updateForwardedAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Delete an Address
     * @see https://docs.wildduck.email/api/#operation/deleteUserAddress
     *
     * @param user - ID of the user
     * @param address - ID of the address
     */
    deleteUserAddress(user: string, address: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>((resolve, reject) => {
            this.http.delete('/users/{user}/addresses/{address}', { params: { user, address } })
              .then(r => {
                  this.events.emitFromResponse(this.deleteUserAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteUserAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request Addresses information
     * @see https://docs.wildduck.email/api/#operation/getUserAddress
     *
     * @param user - ID of the user
     * @param address - ID of the address
     */
    getUserAddress(user: string, address: string): Promise<IWildduckApiGetUserAddressResponse> {
        return new Promise<IWildduckApiGetUserAddressResponse>((resolve, reject) => {
            this.http.get('/users/{user}/addresses/{address}', { params: { user, address } })
              .then(r => {
                  this.events.emitFromResponse(this.getUserAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getUserAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Update Address information
     * @see https://docs.wildduck.email/api/#operation/updateUserAddress
     *
     * @param user - ID of the user
     * @param address - ID of the address
     * @param dto
     */
    updateUserAddress(user: string, address: string, dto: IWildduckApiUpdateUserAddressRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>((resolve, reject) => {
            this.http.put('/users/{user}/addresses/{address}', { params: { user, address }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.updateUserAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.updateUserAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Get Address info
     * @see https://docs.wildduck.email/api/#operation/resolveAddress
     *
     * @param address - ID of the address or E-Mail address string
     * @param options
     */
    resolveAddress(address: string, options?: Partial<IWildduckApiResolveAddressOptions>): Promise<IWildduckApiResolveAddressResponse> {
        return new Promise<IWildduckApiResolveAddressResponse>((resolve, reject) => {
            this.http.get('/addresses/{address}', { params: { address }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.resolveAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.resolveAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List registered Addresses
     * @see https://docs.wildduck.email/api/#operation/getAddresses
     *
     * @param options
     */
    getRegisteredAddresses(options?: Partial<IWildduckApiGetAddressesOptions>): Promise<IWildduckApiGetAddressesResponse> {
        return new Promise<IWildduckApiGetAddressesResponse>((resolve, reject) => {
            this.http.get('/addresses', { query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getRegisteredAddresses, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getRegisteredAddresses, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List registered Addresses
     * @see https://docs.wildduck.email/api/#operation/getUserAddresses
     *
     * @param user - ID of the user
     * @param options
     */
    getRegisteredUserAddresses(user: string, options?: Partial<IWildduckApiGetUserAddressesOptions>): Promise<IWildduckApiGetUserAddressesResponse> {
        return new Promise<IWildduckApiGetUserAddressesResponse>((resolve, reject) => {
            this.http.get('/users/{user}/addresses', { query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getRegisteredUserAddresses, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getRegisteredUserAddresses, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Create new Address
     * @description Add a new email address for a User. Addresses can contain unicode characters. Dots in usernames are normalized so no need to create both "firstlast@example.com" and "first.last@example.com" Special addresses *@example.com, *suffix@example.com and username@* catches all emails to these domains or users without a registered destination (requires allowWildcard argument)
     * @see https://docs.wildduck.email/api/#operation/createUserAddress
     *
     * @param user - ID of the user
     * @param dto
     */
    createUserAddress(user: string, dto: IWildduckApiCreateUserAddressRequest): Promise<IWildduckApiCreateUserAddressResponse> {
        return new Promise<IWildduckApiCreateUserAddressResponse>((resolve, reject) => {
            this.http.post('/users/{user}/addresses', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.createUserAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createUserAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List addresses from communication register
     * @see https://docs.wildduck.email/api/#operation/getUserAddressregister
     *
     * @param user - ID of the user
     * @param options
     */
    getUserAddressesFromRegister(user: string, options?: Partial<IWildduckApiGetUserAddressesregisterOptions> & Pick<IWildduckApiGetUserAddressesregisterOptions, 'query'>): Promise<IWildduckApiGetUserAddressesregisterResponse> {
        return new Promise<IWildduckApiGetUserAddressesregisterResponse>((resolve, reject) => {
            this.http.get('/users/{user}/addressregister', { params: { user }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getUserAddressesFromRegister, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getUserAddressesFromRegister, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List addresses from communication register
     * @description Add a new forwarded email address. Addresses can contain unicode characters. Dots in usernames are normalized so no need to create both "firstlast@example.com" and "first.last@example.com" Special addresses *@example.com and username@* catches all emails to these domains or users without a registered destination (requires allowWildcard argument)
     * @see https://docs.wildduck.email/api/#operation/createForwardedAddress
     *
     */
    createForwardedAddress(dto: IWildduckApiCreateForwardedAddressRequest): Promise<IWildduckApiCreateForwardedAddressResponse> {
        return new Promise<IWildduckApiCreateForwardedAddressResponse>((resolve, reject) => {
            this.http.post('/addresses/forwarded', { body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.createForwardedAddress, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createForwardedAddress, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Rename domain in addresses
     * @description Renames domain names for addresses, DKIM keys and Domain Aliases
     * @see https://docs.wildduck.email/api/#operation/renameDomain
     *
     */
    renameDomain(dto: IWildduckApiRenameDomainRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>((resolve, reject) => {
            this.http.put('/addresses/renameDomain', { body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.renameDomain, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.renameDomain, e);
                  reject(createHttpException(e));
              })
        });
    }

}