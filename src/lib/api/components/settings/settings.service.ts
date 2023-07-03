import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {
    IWildduckApiCreateSettingRequest,
    IWildduckApiCreateSettingResponse,
    IWildduckApiGetSettingResponse,
    IWildduckApiGetSettingsResponse,
    IWildduckApiSuccessResponse
} from "../../client-schema";
import {IWildduckApiGetSettingOptions, IWildduckApiGetSettingsOptions} from "./settings.interface";
import {AxiosError} from "axios";

/**
 * Settings
 * @see https://docs.wildduck.email/api/#tag/Settings
 */
export class WildduckSettingsService extends WildduckClientComponent {

    /**
     * Get Settings
     * @see https://docs.wildduck.email/api/#operation/getSettings
     *
     * @param options
     */
    getSettings(options?: Partial<IWildduckApiGetSettingsOptions>): Promise<IWildduckApiGetSettingsResponse> {
        return new Promise<IWildduckApiGetSettingsResponse>(async (resolve, reject) => {
            this.http.get('/settings', { query: options })
                .then(r => {
                    this.events.emitFromResponse(this.getSettings, r);
                    resolve(r.data);
                })
                .catch((e: AxiosError) => {
                    this.events.emitFromError(this.getSettings, e);
                    reject(createHttpException(e));
                })
        });
    }

    /**
     * Delete a message
     * @see https://docs.wildduck.email/api/#operation/deleteMessage
     *
     * @param setting - Key of the setting
     */
    deleteSetting(setting: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/settings/{setting}', { params: { setting } })
              .then(r => {
                  this.events.emitFromResponse(this.deleteSetting, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.deleteSetting, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Get Setting value
     * @see https://docs.wildduck.email/api/#operation/getSetting
     *
     * @param setting - Key of the setting
     * @param options
     */
    getSetting(setting: string, options?: Partial<IWildduckApiGetSettingOptions>): Promise<IWildduckApiGetSettingResponse> {
        return new Promise<IWildduckApiGetSettingResponse>(async (resolve, reject) => {
            this.http.get('/settings/{setting}', { params: { setting }, query: options })
              .then(r => {
                  this.events.emitFromResponse(this.getSetting, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.getSetting, e);
                  reject(createHttpException(e));
              })
        });
    }

    /**
     * Create or Update Setting
     * @see https://docs.wildduck.email/api/#operation/createSetting
     *
     * @param setting - Key of the setting
     * @param dto
     */
    setSetting(setting: string, dto: IWildduckApiCreateSettingRequest): Promise<IWildduckApiCreateSettingResponse> {
        return new Promise<IWildduckApiCreateSettingResponse>(async (resolve, reject) => {
            this.http.post('/settings/{setting}', { params: { setting }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.setSetting, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.setSetting, e);
                  reject(createHttpException(e));
              })
        });
    }

}