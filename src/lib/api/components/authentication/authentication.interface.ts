export interface IWildduckApiGetAuthlogOptions {
    /** Limit listing only to values with specific action value */
    action: string;
    /** Limit listing only to values with specific IP address */
    filterIp: string;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: string;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}

export interface IWildduckApiPreCheckAuthRequest {
    /** Username or E-mail address */
    username: string;
    /** Required scope. One of master, imap, smtp, pop3 */
    scope?: 'master'|'imap'|'smtp'|'pop3';
    /** Session identifier for the logs */
    sess?: string;
    /** IP address for the logs */
    ip?: string;
}

export interface IWildduckApiPreCheckAuthResponse {
    /** Indicates successful response */
    success: boolean;
    /** ID of authenticated User */
    id: string;
    /** Username of authenticated User */
    username: string;
    /** The scope this authentication is valid for */
    scope: string;
    /** List of enabled 2FA mechanisms */
    require2fa: string[];
}