import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateASPRequest,
    IWildduckApiCreateASPResponse,
    IWildduckApiGetASPResponse,
    IWildduckApiGetASPsResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {AxiosError} from "axios";

/**
 * Application Passwords
 * @see https://docs.wildduck.email/api/#tag/ApplicationPasswords
 */
export class WildduckApplicationPasswordsService extends WildduckClientComponent {

    /**
     * Delete an Application Password
     * @see https://docs.wildduck.email/api/#operation/deleteASP
     *
     * @param user - ID of the User
     * @param asp - ID of the Application Password
     */
    deleteApplicationPassword(user: string, asp: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/asps/{asp}', { params: { user, asp } })
              .then(r => {
                  this.events.emitFromResponse(this.deleteApplicationPassword, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteApplicationPassword, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Request ASP information
     * @see https://docs.wildduck.email/api/#operation/getASP
     *
     * @param user - ID of the User
     * @param asp - ID of the Application Password
     */
    getApplicationPassword(user: string, asp: string): Promise<IWildduckApiGetASPResponse> {
        return new Promise<IWildduckApiGetASPResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/asps/{asp}', { params: { user, asp } })
              .then(r => {
                  this.events.emitFromResponse(this.getApplicationPassword, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getApplicationPassword, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * List Application Passwords
     * @see https://docs.wildduck.email/api/#operation/getASPs
     *
     * @param user - ID of the User
     */
    getApplicationPasswords(user: string): Promise<IWildduckApiGetASPsResponse> {
        return new Promise<IWildduckApiGetASPsResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/asps', { params: { user } })
              .then(r => {
                  this.events.emitFromResponse(this.getApplicationPasswords, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getApplicationPasswords, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Create new Application Password
     * @see https://docs.wildduck.email/api/#operation/createASP
     *
     * @param user - ID of the User
     * @param dto
     */
    createApplicationPassword(user: string, dto: IWildduckApiCreateASPRequest): Promise<IWildduckApiCreateASPResponse> {
        return new Promise<IWildduckApiCreateASPResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/asps', { params: { user } })
              .then(r => {
                  this.events.emitFromResponse(this.createApplicationPassword, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.createApplicationPassword, e);
                  reject(createHttpException(e));
              })
        });
    }

}