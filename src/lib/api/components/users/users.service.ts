import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateUserRequest,
    IWildduckApiCreateUserResponse,
    IWildduckApiGetUserResponse,
    IWildduckApiGetUsersResponse,
    IWildduckApiLogoutUserRequest,
    IWildduckApiRecalculateQuotaResponse,
    IWildduckApiRecoverInfoResponse,
    IWildduckApiResetUserPasswordRequest,
    IWildduckApiResetUserPasswordResponse,
    IWildduckApiResolveIdResponse,
    IWildduckApiSuccessResponse,
    IWildduckApiUpdateUserRequest
} from "../../client-schema";
import {
    IWildduckApiDeleteUserOptions,
    IWildduckApiGetUsersOptions,
    IWildduckApiRecoverInfoOptions
} from "./users.interface";
import {SSESource} from "../../../interfaces/sse.interface";

/**
 * Users
 * @see https://docs.wildduck.email/api/#tag/Users
 */
export class WildduckUsersService extends WildduckClientComponent {

    /**
     * Delete a user
     * @description This method deletes user and address entries from DB and schedules a background task to delete messages. You can call this method several times even if the user has already been deleted, in case there are still some pending messages.
     * @see https://docs.wildduck.email/api/#operation/deleteUser
     *
     * @param id - ID of the user
     * @param options
     */
    deleteUser(id: string, options?: Partial<IWildduckApiDeleteUserOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{id}', { params: { id }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Request User information
     * @see https://docs.wildduck.email/api/#operation/getUser
     *
     * @param id - ID of the user
     */
    getUser(id: string): Promise<IWildduckApiGetUserResponse> {
        return new Promise<IWildduckApiGetUserResponse>(async (resolve, reject) => {
            this.http.get('/users/{id}', { params: { id } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Update User information
     * @see https://docs.wildduck.email/api/#operation/updateUser
     *
     * @param id - ID of the user
     * @param dto
     */
    updateUser(id: string, dto: IWildduckApiUpdateUserRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{id}', { params: { id }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Open change stream - Not available at the moment
     * @see https://docs.wildduck.email/api/#operation/getUpdates
     *
     * @param id - ID of the user
     */
    getUpdates(id: string): Promise<SSESource> {
        return new Promise<SSESource>(async (resolve, reject) => {
            try{
                resolve(this.sse.create('/users/{id}/updates', { id }));
            }catch(e){
                reject(e);
            }
        });
    }

    /**
     * Resolve ID for a username
     * @see https://docs.wildduck.email/api/#operation/resolveUser
     *
     * @param username - Username of the User. Alphanumeric value. Must start with a letter, dots are allowed but informational only ("user.name" is the same as "username")
     */
    resolveUserId(username: string): Promise<IWildduckApiResolveIdResponse> {
        return new Promise<IWildduckApiResolveIdResponse>(async (resolve, reject) => {
            this.http.get('/users/resolve/{username}', { params: { username } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Return recovery info for a deleted user
     * @see https://docs.wildduck.email/api/#operation/getUser
     *
     * @param id - ID of the user
     * @param options
     */
    restoreUserInfo(id: string, options?: Partial<IWildduckApiRecoverInfoOptions>): Promise<IWildduckApiRecoverInfoResponse> {
        return new Promise<IWildduckApiRecoverInfoResponse>(async (resolve, reject) => {
            this.http.get('/users/{id}/restore', { params: { id }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Cancel user deletion task
     * @description Use this endpoint to cancel a timed deletion task scheduled by DELETE /user/{id}. If user data is not yet deleted then the account is fully recovered, except any email addresses that might have been already recycled
     * @see https://docs.wildduck.email/api/#operation/restoreUser
     *
     * @param id - ID of the user
     * @param options
     */
    restoreUser(id: string, options?: Partial<IWildduckApiRecoverInfoOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.post('/users/{id}/restore', { params: { id }, body: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List registered Users
     * @see https://docs.wildduck.email/api/#operation/getUsers
     *
     * @param id - ID of the user
     * @param options
     */
    getUsers(id: string, options?: Partial<IWildduckApiGetUsersOptions>): Promise<IWildduckApiGetUsersResponse> {
        return new Promise<IWildduckApiGetUsersResponse>(async (resolve, reject) => {
            this.http.get('/users', { params: { id }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Create new user
     * @see https://docs.wildduck.email/api/#operation/createUser
     *
     * @param dto
     */
    createUser(dto: IWildduckApiCreateUserRequest): Promise<IWildduckApiCreateUserResponse> {
        return new Promise<IWildduckApiCreateUserResponse>(async (resolve, reject) => {
            this.http.post('/users', { body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Recalculate User quota
     * @description This method recalculates quota usage for a User. Normally not needed, only use it if quota numbers are way off. This method is not transactional, so if the user is currently receiving new messages then the resulting value is not exact.
     * @see https://docs.wildduck.email/api/#operation/recalculateQuota
     *
     * @param user - ID of the user
     */
    recalculateQuota(user: string): Promise<IWildduckApiRecalculateQuotaResponse> {
        return new Promise<IWildduckApiRecalculateQuotaResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/quota/reset', { params: { user } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Recalculate Quota for all Users
     * @description This method recalculates quota usage for all Users. Normally not needed, only use it if quota numbers are way off. This method is not transactional, so if the user is currently receiving new messages then the resulting value is not exact.
     * @see https://docs.wildduck.email/api/#operation/recalculateQuotaAllUsers
     *
     */
    recalculateQuotaAllUsers(): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.post('/users/reset')
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Log out User
     * @description This method logs out all user sessions in IMAP
     * @see https://docs.wildduck.email/api/#operation/logoutUser
     *
     */
    logoutUser(id: string, dto: IWildduckApiLogoutUserRequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{id}/logout', { params: { id }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Log out User
     * @description This method logs out all user sessions in IMAP
     * @see https://docs.wildduck.email/api/#operation/logoutUser
     *
     */
    resetUserPassword(id: string, dto: IWildduckApiResetUserPasswordRequest): Promise<IWildduckApiResetUserPasswordResponse> {
        return new Promise<IWildduckApiResetUserPasswordResponse>(async (resolve, reject) => {
            this.http.post('/users/{id}/password/reset', { params: { id }, body: dto })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}