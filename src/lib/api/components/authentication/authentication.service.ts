import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiAuthenticateRequest,
    IWildduckApiAuthenticateResponse,
    IWildduckApiGetAuthlogEventResponse,
    IWildduckApiGetAuthlogResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {
    IWildduckApiGetAuthlogOptions,
    IWildduckApiPreCheckAuthRequest,
    IWildduckApiPreCheckAuthResponse
} from "./authentication.interface";
import {AxiosError} from "axios";

/**
 * Authentication
 * @see https://docs.wildduck.email/api/#tag/Authentication
 */
export class WildduckAuthenticationService extends WildduckClientComponent {

    /**
     * Invalidate authentication token
     * @description This method invalidates currently used authentication token. If token is not provided then nothing happens
     * @see https://docs.wildduck.email/api/#operation/invalidateAccessToken
     *
     */
    deleteAuthenticationToken(): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/authenticate')
              .then(r => {
                  this.events.emitFromResponse(this.deleteAuthenticationToken, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteAuthenticationToken, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Authenticate a User
     * @see https://docs.wildduck.email/api/#operation/authenticate
     *
     * @param dto
     */
    createAuthenticationToken(dto: IWildduckApiAuthenticateRequest): Promise<IWildduckApiAuthenticateResponse> {
        return new Promise<IWildduckApiAuthenticateResponse>(async (resolve, reject) => {
            this.http.post('/authenticate')
              .then(r => {
                  this.events.emitFromResponse(this.createAuthenticationToken, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createAuthenticationToken, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Pre-auth check
     * @description Check if a username exists and can be used for authentication
     * @see https://docs.wildduck.email/api/#operation/preauth
     *
     * @param dto
     */
    preAuthCheck(dto: IWildduckApiPreCheckAuthRequest): Promise<IWildduckApiPreCheckAuthResponse> {
        return new Promise<IWildduckApiPreCheckAuthResponse>(async (resolve, reject) => {
            this.http.post('/preauth')
              .then(r => {
                  this.events.emitFromResponse(this.preAuthCheck, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.preAuthCheck, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List authentication Events
     * @see https://docs.wildduck.email/api/#operation/getAuthlog
     *
     * @param user - ID of the user
     * @param options
     */
    getAuthenticationEvents(user: string, options?: Partial<IWildduckApiGetAuthlogOptions>): Promise<IWildduckApiGetAuthlogResponse> {
        return new Promise<IWildduckApiGetAuthlogResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/authlog', { params: { user }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getAuthenticationEvents, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getAuthenticationEvents, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request Event information
     * @see https://docs.wildduck.email/api/#operation/getAuthlogEvent
     *
     * @param user - ID of the user
     * @param event - ID of the event
     */
    getAuthenticationEvent(user: string, event: string): Promise<IWildduckApiGetAuthlogEventResponse> {
        return new Promise<IWildduckApiGetAuthlogEventResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/authlog/{event}', { params: { user, event } })
              .then(r => {
                  this.events.emitFromResponse(this.getAuthenticationEvent, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getAuthenticationEvent, e);
                  reject(createHttpException(e));
              })
        });
    }

}