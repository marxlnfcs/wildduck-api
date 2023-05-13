import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCheckTotp2FARequest,
    IWildduckApiEnableTotp2FARequest,
    IWildduckApiSetupTotp2FARequest,
    IWildduckApiSetupTotp2FAResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {
    IWildduckApiDisable2FAOptions,
    IWildduckApiDisableTotp2FAOptions,
    IWildduckApiEnable2FAOptions
} from "./two-factor-auth.interface";
import {AxiosError} from "axios";

/**
 * TwoFactorAuth
 * @see https://docs.wildduck.email/api/#tag/TwoFactorAuth
 */
export class WildduckTwoFactorAuthService extends WildduckClientComponent {

    /**
     * Validate TOTP Token
     * @description This method checks if a TOTP token provided by a User is valid for authentication
     * @see https://docs.wildduck.email/api/#operation/checkTotp2FA

     * @param user - ID of the user
     * @param dto
     */
    check2FA(user: string, dto: IWildduckApiCheckTotp2FARequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/2fa/totp/check', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.check2FA, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.check2FA, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Disable 2FA
     * @see https://docs.wildduck.email/api/#operation/disable2FA

     * @param user - ID of the user
     * @param options
     */
    disable2FA(user: string, options?: Partial<IWildduckApiDisable2FAOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/2fa', { params: { user }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.disable2FA, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.disable2FA, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Disable custom 2FA for a user
     * @description This method disables custom 2FA. If it was the only 2FA set up, then account password for IMAP/POP3/SMTP gets enabled again
     * @see https://docs.wildduck.email/api/#operation/disableCustom2FA

     * @param user - ID of the user
     * @param options
     */
    disableCustom2FA(user: string, options?: Partial<IWildduckApiDisable2FAOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/2fa/custom', { params: { user }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.disableCustom2FA, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.disableCustom2FA, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Enable custom 2FA for a user
     * @description This method disables account password for IMAP/POP3/SMTP
     * @see https://docs.wildduck.email/api/#operation/enableCustom2FA

     * @param user - ID of the user
     * @param options
     */
    enableCustom2FA(user: string, options?: Partial<IWildduckApiEnable2FAOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/2fa/custom', { params: { user }, body: options })
              .then(r => {
                  this.events.emitFromResponse(this.enableCustom2FA, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.enableCustom2FA, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Disable TOTP auth
     * @description This method disables TOTP for a user. Does not affect other 2FA mechanisms a user might have set up
     * @see https://docs.wildduck.email/api/#operation/disableTotp2FA

     * @param user - ID of the user
     * @param options
     */
    disableTOTPAuth(user: string, options?: Partial<IWildduckApiDisableTotp2FAOptions>): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.put('/users/{user}/2fa/totp', { params: { user }, body: options })
              .then(r => {
                  this.events.emitFromResponse(this.disableTOTPAuth, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.disableTOTPAuth, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Enable TOTP seed
     * @description This method enables TOTP for a user by verifying the seed value generated from 2fa/totp/setup
     * @see https://docs.wildduck.email/api/#operation/enableTotp2FA

     * @param user - ID of the user
     * @param dto
     */
    enableTOTPSeed(user: string, dto: IWildduckApiEnableTotp2FARequest): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/2fa/totp', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.enableTOTPSeed, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.enableTOTPSeed, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Generate TOTP seed
     * @description This method generates TOTP seed and QR code for 2FA. User needs to verify the seed value using 2fa/totp/enable endpoint
     * @see https://docs.wildduck.email/api/#operation/setupTotp2FA

     * @param user - ID of the user
     * @param dto
     */
    generateTOTPSeed(user: string, dto: IWildduckApiSetupTotp2FARequest): Promise<IWildduckApiSetupTotp2FAResponse> {
        return new Promise<IWildduckApiSetupTotp2FAResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/2fa/totp/setup', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.generateTOTPSeed, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.generateTOTPSeed, e);
                  reject(createHttpException(e));
              })
        });
    }

}