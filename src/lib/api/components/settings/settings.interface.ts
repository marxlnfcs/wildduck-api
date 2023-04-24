export interface IWildduckApiGetSettingOptions {
    /** Session identifier for the logs */
    sess: string;
    /** IP address for the logs */
    ip: string;
}

export interface IWildduckApiGetSettingsOptions {
    /** Optional partial match of the setting key */
    filter: string;
    /** Session identifier for the logs */
    sess: string;
    /** IP address for the logs */
    ip: string;
}